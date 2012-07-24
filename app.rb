require 'sinatra'
require 'sass'
require 'mixpanel'

require './helpers/helpers.rb'

### Set Mixpanel
use Mixpanel::Tracker::Middleware, '40c9854b5ded2a6a4bf575788069428d'

set :sass, :style => :compressed

before do 
  @mixpanel = Mixpanel::Tracker.new('40c9854b5ded2a6a4bf575788069428d', request.env, true)
end

get '/stylesheets/:filename.css' do
  content_type 'text/css', :charset => 'utf-8'
  filename = "#{params[:filename]}"
  render :sass, filename.to_sym, :views => './views/stylesheets'
end

get '/' do
  @mixpanel.track_event("Home Page View")
  @javascripts = ['/javascripts/jquery.js', '/javascripts/index.js']

  erb :index
end

post '/newsletter' do
  email_regex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/

  if params[:email] =~ email_regex and !email_exists?('newsletter.txt', params[:email])
    add_to_newsletter('newsletter.txt', params[:email])
  end

  redirect to('/') unless request.xhr?
end
