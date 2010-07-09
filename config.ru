["rubygems", "sinatra", "erb"].each do |file|
  require file
end

set :sessions, true

disable :run
require "eatwatch"
run Sinatra::Application