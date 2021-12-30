class ParticipantsController < ApplicationController

    before_action :check_user, only: [:create]
    before_action :authenticate_user, only: [:destroy]

    def create 
        participant = Participant.create(participantParams)
        trip = Trip.find(participant.trip_id)
        trip.update(current_participants: trip.participants.count)
        render json: trip
    end

    def destroy 
        participant = Participant.find(params[:id])
        trip = Trip.find(participant.trip_id)
        participant.destroy
        trip.update(current_participants: trip.participants.count)
        render json: trip
    end

    private

    def participantParams
        params.permit(:user_id, :trip_id)
    end

    def check_user
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

    def authenticate_user
        return render json: { error: "Not authorized" }, status: :unauthorized unless session[:user_id] == Participant.find(params[:id]).user_id
    end

end
