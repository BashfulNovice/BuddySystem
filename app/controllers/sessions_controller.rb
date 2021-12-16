class SessionsController < ApplicationController


    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, serializer: WhoamiSerializer, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
        #render json: user
    end

    def destroy 
        session.delete :user_id
        
        head :no_content
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, serializer: WhoamiSerializer
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    private

end
