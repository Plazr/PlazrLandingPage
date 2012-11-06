require 'sinatra'
require 'sass'

require './helpers/helpers.rb'

configure do
	set :sass, :style => :compressed
end

get '/stylesheets/:filename.css' do
	content_type 'text/css', :charset => 'utf-8'
	filename = "#{params[:filename]}"
	render :scss, filename.to_sym, :views => './views/stylesheets'
end

get '/' do
	@javascripts = ['/javascripts/jquery.js', '/javascripts/bootstrap-modal.js', '/javascripts/app.js']
	erb :index
end

post '/newsletter' do
	redirect to('/') unless request.xhr?
end
