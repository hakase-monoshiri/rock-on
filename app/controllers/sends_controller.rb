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

    private

    def send_params
        params.require(:send).permit(:climber, :date, :notes, :climb_id)
    end 

end