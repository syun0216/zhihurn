import React,{Component} from 'react';
import {Toast} from 'native-base';

const ToastUtil = {
  show(message,duration,position,buttonText){
    let _message = message === null ? '发生未知错误' : message;
    let _duration = duration === null ? 1000 : duration;
    let _position = position === null ? 'bottom' : position;
    let _buttonText = buttonText === null ? 'ok' : buttonText;
    Toast.show({
        text: _message,
        position: _position,
        buttonText: _buttonText,
        // type:type,
        duration:_duration
    });
  }
};

module.exports = ToastUtil;
