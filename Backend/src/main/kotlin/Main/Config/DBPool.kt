package Main.Config

/**
 * Created by nikolaev on 21.06.16.
 */
import org.apache.commons.dbcp2.BasicDataSource
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.Resource;


@Configuration
@PropertySource("classpath:database.properties")
open class Config {

    @Resource
    private val env: Environment? = null

        @Bean
        open fun getDataSource(): BasicDataSource {
            val basicDataSource = BasicDataSource()
            basicDataSource.driverClassName = env!!.getProperty("db.driver")
            basicDataSource.url = env.getProperty("db.url")
            basicDataSource.username = env.getProperty("db.username")
            basicDataSource.password = env.getProperty("db.password")
            basicDataSource.maxTotal = (Integer.parseInt(env.getProperty("db.max-active")))
            basicDataSource.initialSize = Integer.parseInt(env.getProperty("db.initial-size"))
            basicDataSource.validationQuery = env.getProperty("db.validation-query")
            return basicDataSource
        }
}

