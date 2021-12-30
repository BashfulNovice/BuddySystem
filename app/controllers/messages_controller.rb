class MessagesController < ApplicationController


    def create
        message = Message.create(messageParams)
        render json: message
    end

    private

    def messageParams 
        params.permit(:content, :trip_id, :sender_id)
    end
end
