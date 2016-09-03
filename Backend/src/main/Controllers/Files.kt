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

    obj = jsonObject (
            "status" to "OK"
    )

    req.attribute("org.eclipse.jetty.multipartConfig", MultipartConfigElement("/temp"))
    req.raw().getPart("uploaded_file").inputStream.use({ `is` ->
        print(`is`)
    })

    return obj
}