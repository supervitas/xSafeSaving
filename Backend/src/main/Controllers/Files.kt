package Controllers

/**
 * Created by nikolaev on 03.09.16.
 */
import DB.Database.createFile
import DB.Database.getCountOfFiles
import DB.Database.getUserFiles
import com.github.salomonbrys.kotson.fromJson
import com.github.salomonbrys.kotson.jsonObject
import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonObject
import spark.Request
import spark.Response
import java.io.File
import java.io.FileOutputStream
import java.net.MalformedURLException
import java.net.URL
import java.nio.channels.Channels
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*
import javax.servlet.MultipartConfigElement

fun getUserFiles(req: Request, res: Response): String {

    val gson = Gson()
    val obj: String
    res.status(200)

    val skip = req.queryParams("skip")

    val username : String? = req.session().attribute("user")
    if (username == null) {
        res.status(401)
        val json = {
            val status = "You need auth to do this"
            val key = "status"
        }
        obj = gson.toJson(json)
        return obj
    }

    val result = getUserFiles(username, skip.toInt())

    return result
}

fun getPagination(req: Request, res: Response): String {
    val gson = Gson()
    val obj: String
    res.status(200)

    val skip = req.queryParams("skip")

    val username : String? = req.session().attribute("user")
    if (username == null) {
        res.status(401)
        val json = {
            val status = "You need auth to do this"
            val key = "status"
        }
        obj = gson.toJson(json)
        return obj
    }

    val result = getCountOfFiles(username)

    return result
}


fun uploadUserFiles(req: Request, res: Response): String {
    var obj: String
    val gson = Gson()

    res.status(200)
    val username : String? = req.session().attribute("user")
    val list: Map<String, String>

    var json = {}
    obj = gson.toJson(json)

    if (username == null) {
        res.status(401)
        val json = JsonObject()
        json.addProperty("message", "You need auth to do this")
        obj = gson.toJson(json)
        return obj
    }
    if (req.contentType() == "application/json") {
        try {
            list = gson.fromJson<Map<String, String>>( req.body() )
        } catch (e: com.google.gson.JsonSyntaxException) {
            res.status(400)
            json = {
                val status = "Bad Json"
                val key = "error"
            }
            obj = gson.toJson(json)
            return obj
        }

        val url : String? = list["url"]
        if (url != null && !url.toLowerCase().contains("file://") ) {

            val size: Long
            val contentType: String
            val downloadURL: URL
            try {
                downloadURL = URL(url)
            } catch (e: MalformedURLException) {
                res.status(400)
                val json = JsonObject()
                json.addProperty("message", "Invalid URL")
                obj = gson.toJson(json)
                return obj
            }
            try {
                val conn = downloadURL.openConnection()
                size = conn.contentLengthLong
                contentType = conn.contentType
                conn.inputStream.close()
                if (size / (1024 * 1024) > 70) {
                    val json = JsonObject()
                    json.addProperty("message", "File to big")
                    obj = gson.toJson(json)
                    return obj
                }
            } catch (e: java.io.FileNotFoundException){
                res.status(400)
                val json = JsonObject()
                json.addProperty("message", "File from that url not found")
                obj = gson.toJson(json)
                return obj
            }
            val pathString = getDateAndCreateFolder(username)

            val rbc = Channels.newChannel(downloadURL.openStream())
            val randomFileName = UUID.randomUUID().toString().substring(0,6) + "." +
                    contentType.substring(contentType.lastIndexOf("/") + 1)
            val path = pathString + randomFileName
            val fos = FileOutputStream(path)
            fos.channel.transferFrom(rbc, 0, java.lang.Long.MAX_VALUE)
            createFile(username, path, randomFileName, contentType)

            val jsonArray = JsonArray()
            val innerObject = jsonObject()

            innerObject.addProperty("path", path)
            innerObject.addProperty("content-type", contentType)
            innerObject.addProperty("filename", randomFileName)

            jsonArray.add(innerObject)
            obj = gson.toJson(jsonArray)
            return obj
        } else {
            res.status(403)
            val json = JsonObject()
            json.addProperty("message", "Invalid URL")
            obj = gson.toJson(json)
            return obj
        }

    } else { //upload from multipart-form-data

        val jsonArray = JsonArray()
        val location = "files"          // the directory location where files will be stored (not used)
        val maxFileSize: Long = 100000000       // 100 mb for file
        val maxRequestSize: Long = 200000000    // 200 mb for all files
        val fileSizeThreshold = 1024

        val multipartConfigElement = MultipartConfigElement(
                location, maxFileSize, maxRequestSize, fileSizeThreshold)
        req.raw().setAttribute("org.eclipse.jetty.multipartConfig",
                multipartConfigElement)


        val parts = req.raw().parts

        val pathString = getDateAndCreateFolder(username)

        for (part in parts) {
            part.inputStream.use({ `in` ->
                Files.copy(`in`, Paths.get(pathString + part.submittedFileName),
                        StandardCopyOption.REPLACE_EXISTING)
            })
            createFile(username, pathString + part.submittedFileName, part.submittedFileName,
                    part.contentType)
            val innerObject = JsonObject()
            innerObject.addProperty("path", pathString + part.submittedFileName)
            innerObject.addProperty("content-type", part.contentType)
            innerObject.addProperty("filename", part.submittedFileName)


            jsonArray.add(innerObject)

        }
        obj = gson.toJson(jsonArray)
    }

    return obj
}
fun getDateAndCreateFolder(username:String):String {
    val date: Date = Date()
    val cal = Calendar.getInstance()
    cal.setTime(date)
    val year = cal.get(Calendar.YEAR)
    val month = cal.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.ENGLISH)
    val day = cal.get(Calendar.DAY_OF_MONTH)

    val userDir = File("../upload/$username/$year/$month/$day")
    userDir.mkdirs()
    return "../upload/$username/$year/$month/$day/"
}