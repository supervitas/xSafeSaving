/**
 * Created by nikolaev on 17.08.16.
 */
import  spark.Spark.*


fun main(args: Array<String>) {
    port(8081)
    before { request, response ->
        val authenticated: Boolean
    }
    put("api/auth") { req, res -> AuthUser(req, res) }
    post("api/auth") { req, res -> AuthUser(req, res) }
    delete("api/auth") { req, res -> AuthUser(req, res) }


    exception(Exception::class.java) { e, req, res -> e.printStackTrace() }
}