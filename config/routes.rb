Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  #login/logout/whoami

  post '/login', to: 'sessions#create'

  #get '/login', to: 'sessions#create'

  delete "/logout", to: "sessions#destroy"

  get "/whoami", to: "sessions#show"

  #users

  get '/users', to: "users#index"

  post '/users', to: "users#create"
  
  get '/test', to: "users#test"

end
