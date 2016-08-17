/**
 * Created by nikolaev on 17.08.16.
 */
import  spark.Spark.*
import registerUser

fun main(args: Array<String>) {
    port(8081)
    val maxThreads = Runtime.getRuntime().availableProcessors()
    threadPool(maxThreads)

    get("/") { req, res -> registerUser(req, res) }


    get("/hello/:name") { request, response -> "Hello: " + request.params(":name") }

}