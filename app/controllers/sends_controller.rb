class SendsController < ApplicationController

    def index
        sends = Climb.find_by(id: params[:climb_id]).sends
        render json: sends
    end

    def show
        climb = Climb.find_by(id: params[:climb_id])
        send = climb.sends.find_by(id: params[:id])
        render json: send
    end

end