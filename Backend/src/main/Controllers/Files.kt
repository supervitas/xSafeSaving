package Controllers

/**
 * Created by nikolaev on 03.09.16.
 */
import com.github.salomonbrys.kotson.jsonObject
import com.google.gson.Gson
import com.google.gson.JsonObject
import spark.Request
import spark.Response
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
    val gson = Gson()
    var obj: JsonObject
    val list: Map<String, String>
    res.status(200)

    val location = "image"          // the directory location where files will be stored
    val maxFileSize: Long = 50000000       // 50 mb for file
    val maxRequestSize: Long = 20000000    // 200 mb for all files
    val fileSizeThreshold = 1024

    obj = jsonObject (
            "status" to "OK"
    )
    val multipartConfigElement = MultipartConfigElement(
            location, maxFileSize, maxRequestSize, fileSizeThreshold)
    req.raw().setAttribute("org.eclipse.jetty.multipartConfig",
            multipartConfigElement)

    val parts = req.raw().parts
    for (part in parts) {
        System.out.println("Name: " + part.getName())
        System.out.println("Size: " + part.getSize())
        System.out.println("Filename: " + part.getSubmittedFileName())

        print("__________")
    }


//    req.attribute("org.eclipse.jetty.multipartConfig", MultipartConfigElement("/temp"))
//    req.raw()
//    req.raw().getPart("file-0").inputStream.use({ `is` ->
//        print(`is`)
//    })

    return obj
}