class ParticipantsController < ApplicationController

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

end
