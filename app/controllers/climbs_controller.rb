class ClimbsController < ApplicationController

    def index
        climbs = Climb.all
        render json: climbs
    end

    def show
        climb = Climb.find_by(id: params[:id])
        render json: climb
    end
end
