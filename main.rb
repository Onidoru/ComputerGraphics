require 'sinatra'
require 'slim'
require 'sass'
# require 'sinatra/reloader'
require 'rubygems'

# If there are any problems with reloading javascript while using
# Chrome-based browsers, ctrl+shift+r for hard reload is recommended

get('/styles.css') { scss :styles }

get '/?' do
  @title = 'Home'
  slim :home
end

not_found do
  @title = '4 Oh 4'
  slim :not_found
end

get '/lab1/?' do
  @title = 'Lab 1'
  slim :lab1
end

get '/lab2/?' do
  @title = 'Lab 2'
  slim :lab2
end

get '/lab4/?' do
  slim :lab4
end

get '/lab5/?' do
  @title = 'Lab 5'
  slim :lab5
end
