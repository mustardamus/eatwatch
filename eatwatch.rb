get "/" do
  erb :index
end

get "/eaten" do
  File.open('counters/eaten.txt').read.to_s
end

post "/eaten" do
  if numeric?(params[:value])
    current = File.open('counters/eaten.txt').read.to_i
    file = File.open('counters/eaten.txt', 'w')
    file.write(current + params[:value].to_i)
    file.close
    "done"
  else
    "error"
  end
end

private

def numeric?(object)
  true if Float(object) rescue false
end