package Controllers

/**
 * Created by nikolaev on 03.09.16.
 */
import DB.Database.createFile
import DB.Database.getUserFiles
import com.github.salomonbrys.kotson.fromJson
import com.google.gson.Gson
import com.google.gson.JsonObject
import spark.Request
import spark.Response
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.*
import javax.servlet.MultipartConfigElement

fun getUserFiles(req: Request, res: Response): String {

    val gson = Gson()
    val obj: String
    val list: Map<String, String>
    res.status(200)


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

    val result = getUserFiles(username)

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
         json = {
            val status = "You need auth to do this"
            val key = "status"
        }
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
        if (url != null) {
            print(url)
        }

    } else {

        val jsonObject = JsonObject()
        val location = "files"          // the directory location where files will be stored (not used)
        val maxFileSize: Long = 50000000       // 50 mb for file
        val maxRequestSize: Long = 20000000    // 200 mb for all files
        val fileSizeThreshold = 1024

        val multipartConfigElement = MultipartConfigElement(
                location, maxFileSize, maxRequestSize, fileSizeThreshold)
        req.raw().setAttribute("org.eclipse.jetty.multipartConfig",
                multipartConfigElement)


        val parts = req.raw().parts

        val date: Date = Date() // your date
        val cal = Calendar.getInstance()
        cal.setTime(date)
        val year = cal.get(Calendar.YEAR)
        val month = cal.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.ENGLISH)
        val day = cal.get(Calendar.DAY_OF_MONTH)

        val userDir = File("upload/$username/$year/$month/$day")
        userDir.mkdirs()

        for (part in parts) {
            part.inputStream.use({ `in` ->
                Files.copy(`in`, Paths.get("upload/$username/$year/$month/$day/" + part.submittedFileName),
                        StandardCopyOption.REPLACE_EXISTING)
            })
            createFile(username, "upload/$username/$year/$month/$day/" + part.submittedFileName, part.submittedFileName,
                    part.contentType)
            val innerObject = JsonObject()
            innerObject.addProperty("path", "upload/$username/$year/$month/$day/" + part.submittedFileName)
            innerObject.addProperty("content-type", part.contentType)

            jsonObject.add(part.submittedFileName, innerObject)

        }
        obj = gson.toJson(jsonObject)
    }

    return obj
}