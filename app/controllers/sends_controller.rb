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

    def create
        send = Send.new(send_params)
        if send.save
            render json: send
        end
    end

    def destroy
        send = Send.find_by(id: params[:id])
        if send
            send.destroy
            success_obj = {sucess: "Deleted"}
            render json: success_obj
        else
            error_obj = {error: "Did not delete"}
            render json: error_obj
        end
    end
    
    private

    def send_params
        params.require(:send).permit(:climber, :date, :notes, :climb_id)
    end 

end