require 'sinatra'
require 'sass'
require 'gibbon'

require './helpers/helpers.rb'


# require_relative does not exist in ruby 1.8.7
# This is a fallback -- http://stackoverflow.com/a/4718414/951432
unless Kernel.respond_to?(:require_relative)
  module Kernel
    def require_relative(path)
      require File.join(File.dirname(caller[0]), path.to_str)
    end
  end
end

configure do
	set :sass, :style => :compressed
	if ENV['RACK_ENV'] == :development
		KEYS = YAML.load_file("#{settings.root}/config/api_keys.yml")
		set :gb, Gibbon.new(KEYS["mailchimp"])
		set :newsletter, KEYS["mailchimp"]
	else
		set :gb, Gibbon.new(ENV['mailchimp'])
		set :newsletter, ENV['mailchimp']
	end
end

get '/stylesheets/:filename.css' do
	content_type 'text/css', :charset => 'utf-8'
	filename = "#{params[:filename]}"
	render :scss, filename.to_sym, :views => './views/stylesheets'
end

get '/' do
	@javascripts = ['/javascripts/jquery.js', '/javascripts/bootstrap-modal.js', '/javascripts/verimail.jquery.min.js', '/javascripts/verimail.min.js', '/javascripts/app.js']
	erb :index
end

# tem de se verificar se é realmente um email e se não vai repetido
post '/newsletter' do
	email_regex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/
	if params[:email] =~ email_regex
		settings.gb.listSubscribe(:id => settings.newsletter, :email_address => params[:email], :double_optin => false)
		# if params[:email] =~ email_regex and !email_exists?('newsletter.txt', params[:email])
		# add_to_newsletter('newsletter.txt', params[:email])

		# settings.gb.listSubscribe({ :id => settings.list_id,
		# 	:email_address => params[:email],
		# 	:merge_vars => {:fname => "Captain", :lname => "User"},
		# 	:double_optin => false,
		# 	:send_welcome => true })
	end

	redirect to('/') unless request.xhr?
end
