package Main.Database.TResultHandler

import java.sql.ResultSet
import java.sql.SQLException

/**
 * Created by nikolaev on 23.06.16.
 */

interface TResultHandler<T> {
    @Throws(SQLException::class)
    fun handle(resultSet: ResultSet): T
}
