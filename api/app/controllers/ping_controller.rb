# frozen_string_literal: true

class PingController < ApplicationController
  def pong
    render json: { message: "hello from rails!" }
  end
end
