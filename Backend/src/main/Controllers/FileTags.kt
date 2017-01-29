package Controllers

import com.github.salomonbrys.kotson.fromJson
import com.google.gson.Gson
import spark.Request
import spark.Response

/**
 * Created by nikolaev on 29.01.17.
 */

fun manageTagsForFile(req: Request, res: Response,
                      funcForTag: (username: String, filePath: String, tag:String)->Boolean): String {
    val obj: String
    val gson = Gson()

    res.status(200)
    val username : String? = req.session().attribute("user")
    val list: Map<String, String>

    if (username == null) {
        res.status(401)
        obj = JSONResponse.authNeeded()
        return obj
    }
    try {
        list = gson.fromJson<Map<String, String>>(req.body())
    } catch (e: com.google.gson.JsonSyntaxException) {
        res.status(400)
        obj = JSONResponse.badJson()
        return obj
    }
    val tag : String? = list["tag"]
    val filePath: String? = list["path"]
    if (tag != null && filePath != null) {
        if (funcForTag(username, filePath, tag)) {
            res.status(200)
            obj = JSONResponse.makeCustomJsonResponse("message", "OK")
            return obj
        }
    }
    res.status(403)
    obj = JSONResponse.makeCustomJsonResponse("message", "Some Error")
    return obj
}
