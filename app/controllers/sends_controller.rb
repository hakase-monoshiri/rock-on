class SendsController < ApplicationController

    def index
        sends = Climb.find_by(id: params[:climb_id]).sends
        render json: sends
    end

end
