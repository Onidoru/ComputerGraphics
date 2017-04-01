require 'sinatra'
require 'slim'
require 'sass'
require 'sinatra/reloader'

get('/styles.css') { scss :styles }

get '/?' do
  slim :home
end

get '/about/?' do
  slim :about
end

not_found do
  slim :not_found
end

get '/lab1/?' do
  slim :lab1
end

get '/lab2/?' do
  slim :lab2
end

get '/lab3/?' do
  slim :lab3
end
