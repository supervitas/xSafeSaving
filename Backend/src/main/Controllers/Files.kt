package Controllers

/**
 * Created by nikolaev on 03.09.16.
 */
import com.github.salomonbrys.kotson.jsonObject
import com.google.gson.Gson
import com.google.gson.JsonObject
import spark.Request
import spark.Response
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import javax.servlet.MultipartConfigElement

fun getUserFiles(req: Request, res: Response): JsonObject {

    val gson = Gson()
    var obj: JsonObject
    val list: Map<String, String>
    res.status(200)

    obj = jsonObject (
            "status" to "OK"
    )

    print(req.queryParams())
    val username : String? = req.session().attribute("user")

    return obj
}
fun uploadUserFiles(req: Request, res: Response): JsonObject {
    var obj: JsonObject
    res.status(200)
    val username : String? = req.session().attribute("user")
    if (username == null) {
        res.status(401)
        obj = jsonObject (
                "status" to "You are not auth"
        )
        return obj
    }

    val location = "files"          // the directory location where files will be stored
    val maxFileSize: Long = 50000000       // 50 mb for file
    val maxRequestSize: Long = 20000000    // 200 mb for all files
    val fileSizeThreshold = 1024



    val multipartConfigElement = MultipartConfigElement(
            location, maxFileSize, maxRequestSize, fileSizeThreshold)
    req.raw().setAttribute("org.eclipse.jetty.multipartConfig",
            multipartConfigElement)

    val parts = req.raw().parts
    for (part in parts) {

        part.inputStream.use({ `in` ->
            Files.copy(`in`, Paths.get("upload/$username/" + part.submittedFileName), StandardCopyOption.REPLACE_EXISTING);
        })

    }

    obj = jsonObject (
            "status" to "OK"
    )

    return obj
}