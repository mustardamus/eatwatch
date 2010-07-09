use Rack::Auth::Basic do |username, password|
  [username, password] == ['root', 'toor']
end

get "/" do
  erb :index
end

get "/eaten" do
  File.open('counters/eaten.txt').read.to_s
end

get "/burned" do
  File.open('counters/burned.txt').read.to_s
end

post "/add" do
  addnumber(params[:file], params[:value])
end

post "/reset" do
  ["counters/eaten.txt", "counters/burned.txt"].each do |file|
    fp = File.open(file, 'w')
    fp.write("0")
    fp.close
  end
end

private

def numeric?(object)
  true if Float(object) rescue false
end

def addnumber(file, value)
  if numeric?(value)
    current = File.open(file).read.to_i
    file = File.open(file, 'w')
    file.write(current + value.to_i)
    file.close
    "success"
  else
    "error"
  end
end