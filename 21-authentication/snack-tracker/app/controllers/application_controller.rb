class ApplicationController < ActionController::Base

    helper_method :current_username

    # memoization
    def current_username
        if @current_user
            @current_user.username
        else
            @current_user = User.find_by(id: session[:user_id])
            @current_user.username
        end
    end
end
