/**
 * Created by nikolaev on 17.08.16.
 */
import  spark.Spark.*


fun main(args: Array<String>) {

    exception(Exception::class.java) { e, req, res -> e.printStackTrace() }
    port(8081)
    post("api/register") { req, res -> registerUser(req, res) }

}