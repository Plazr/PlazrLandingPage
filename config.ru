require './app'

set :environment, ENV['RACK_ENV'].to_sym
set :app_file,     'app.rb'
disable :run

run Sinatra::Application