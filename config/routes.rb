 Rails.application.routes.draw do

  resources :climbs
      
  resources :climbs, only: [:show] do
    resources :sends
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
