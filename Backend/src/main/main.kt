/**
 * Created by nikolaev on 17.08.16.
 */
import Controllers.*
import  spark.Spark.*


fun main(args: Array<String>) {
    port(8081)
    before { request, response ->
        val username : String? = request.session().attribute("user")
        print(username)
    }
    get("api/auth") { req, res -> checkUserLoginStatus(req, res) }
    put("api/auth") { req, res -> AuthUser(req, res) }
    post("api/auth") { req, res -> AuthUser(req, res) }
    delete("api/auth") { req, res -> logout(req, res) }

    get("api/files") { req, res -> getUserFiles(req, res) }
    post("api/files") { req, res -> uploadUserFiles(req, res) }


    exception(Exception::class.java) { e, req, res -> e.printStackTrace() }
}