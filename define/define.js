export const actions = {
    state: {
        select: 0x00,
        join: 0x01,
        standby: 0x02,
        ready: 0x03,
        online: 0x04,
        finish: 0x05,
        vote: 0x06,
        votingDone: 0x07,
        result: 0x08
    },
    changeCurrentTime: 0x10,
    changeSocketId: 0x20,
    attendees: 0x30,
    start: 0x40,
    timeout: 0x50,
    vote: 0x60,
    changeMeetingEventName: 0x70,
    changeWebsocketStatus: 0x80,
    changeDiscusionStatus: 0x90
};

export const discusionStatus = {
    websocketDisconnect: 0x00,
    discussionJoinFailed: 0x01,
    discussionFailed: 0x02,
    discussionStartFailed: 0x03,
    discussionResultShow: 0x04,
    returnPosts: 0x05,
    websocketError: 0x06,
};

export const websocketStatus = {
    open: 0x00,
    close: 0x01
};

export const discussionErrorMsg = {
    websocketDisconnect: '通信が切断されました＿|￣|○',
    discussionJoinFailed: '討論の参加に失敗しました＿|￣|○',
    discussionFailed: '討論が異常終了しました＿|￣|○',
    discussionStartFailed: '討論の参加に失敗しました＿|￣|○',
    websocketError: '通信エラーが発生しました。＿|￣|○',
}

export const discussionErrorCode = {
    websocketDisconnect: 0x00,
    discussionJoinFailed: 0x01,
    discussionFailed: 0x02,
    discussionStartFailed: 0x03,
    websocketError: 0x04,
}
