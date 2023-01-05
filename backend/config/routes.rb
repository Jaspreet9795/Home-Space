Rails.application.routes.draw do
  resources :quotations
  resources :services
  resources :reviews
  resources :service_providers
  resources :users


  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#delete"
  get "/authorised_user", to: "users#show"

  # get "/users", to: "users#users"
  get "/electricians", to: "users#electricians"
  get "/plumbers", to: "users#plumbers"
  get "/home_cleaning", to: "users#home_cleaning"
  get "/home_painting", to: "users#home_painting"
  get "/users_service_providers", to: "users#users_service_providers"
  get "/filter_service", to: "services#filter_service"
  get "/filter_user_service", to: "services#filter_user_service"

  patch "/confirm_quote/:id", to: "quotations#confirm_quote"
  get "/show_confirmation", to: "quotations#show_confirmation"
  get "/show_user_details", to: "quotations#show_user_details"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # get '/hello', to: 'application#hello_world'
end
