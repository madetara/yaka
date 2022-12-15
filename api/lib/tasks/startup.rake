desc 'Performs migrations and starts server'

task startup: %w[environment db:migrate] do
  sh %(bundle exec rails s -b 0.0.0.0)
end
