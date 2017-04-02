require 'sinatra'
require 'slim'
require 'sass'
#require 'sinatra/reloader'
require 'rubygems'

get('/styles.css') { scss :styles }

get '/?' do
  @title = 'Home'
  slim :home
end

get '/about/?' do
  @title = 'About'
  slim :about
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

get '/lab3/?' do
  @title = 'Lab 3'
  slim :lab3
end
