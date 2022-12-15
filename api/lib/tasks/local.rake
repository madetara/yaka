desc 'Starts up local database via Docker'

namespace :local do
  namespace :api do
    task start: %[local:db:start] do
      Rake::Task["startup"].invoke
    end
  end

  namespace :db do
    container_name = "yaka-db-dev"

    task start: %[environment] do
      if Rails.env == "development"
        db_config = Rails.application.config.database_configuration[Rails.env]
        sh %(docker stop #{container_name})
        sh %(docker rm #{container_name})
        sh %(docker run --restart unless-stopped -d --name #{container_name} \\
-e POSTGRES_PASSWORD=#{db_config['password']} \\
-e POSTGRES_USER=#{db_config['user']} \\
-e POSTGRES_DB=#{db_config['database']} \\
-p #{db_config['port']}:5432 \\
postgres:15.1-alpine)

        # waiting for local DB to start
        sleep 5
      else
        puts "Attempt to start local DB in non-development environment"
      end
    end
  end
end
