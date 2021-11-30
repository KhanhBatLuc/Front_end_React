import EventEmitter from 'events'

const _emitter = new EventEmitter()
//set amout user can listent event
_emitter.setMaxListeners(0)

export const emitter = _emitter