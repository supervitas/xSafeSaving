/**
 * Created by nikolaev on 17.08.16.
 */
import Controllers.*
import DB.addTagToFile
import DB.deleteTagFromFile
import  spark.Spark.*
import java.io.File

class Main {
    companion object {
        @JvmStatic fun main(args: Array<String>) {
            port(8081)
            val uploadDir = File("upload")
            uploadDir.mkdir()

            get("api/auth", ::checkUserLoginStatus)
            put("api/auth", ::AuthUser)
            post("api/auth", ::AuthUser)
            delete("api/auth", ::logout)

            get("api/files", ::getUserFiles)
            post("api/files", ::uploadUserFiles)
            delete("api/files", ::deleteFile)

            post("api/files/tags") { req, res -> manageTagsForFile(req, res, ::addTagToFile) }
            delete("api/files/tags") { req, res -> manageTagsForFile(req, res, ::deleteTagFromFile) }


            get("api/files/pagination", ::getPagination)



            exception(Exception::class.java) { e, req, res -> e.printStackTrace() }
        }
    }
}