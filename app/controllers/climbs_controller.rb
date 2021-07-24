class ClimbsController < ApplicationController

    def index
        climbs = Climb.all
        render json: climbs
    end
end
