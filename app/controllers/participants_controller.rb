class ParticipantsController < ApplicationController

    def create 
        participant = Participant.create(participantParams)
        render json: participant
    end

    def destroy 
        participant = Participant.find(params[:id])
        trip = Trip.find(participant.trip_id)
        participant.destroy
        participant.update(current_participants: trip.participants.count)
        head :no_content
    end

    private

    def participantParams
        params.permit(:user_id, :trip_id)
    end

end
