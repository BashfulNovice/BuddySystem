Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  #login/logout/whoami

  post '/login', to: 'sessions#create'

  #get '/login', to: 'sessions#create'

  delete "/logout", to: "sessions#destroy"

  get "/whoami", to: "sessions#show"

  #users

  get '/users', to: "users#index"

  get '/profile', to: "users#profile"

  get '/users/:id', to: "users#show"

  post '/users', to: "users#create"

  patch 'users', to: "users#update"
  
  get '/test', to: "users#test"

  #Trip routes

  get '/trips', to: "trips#index"

end
