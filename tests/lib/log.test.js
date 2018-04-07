const lo = require('lodash')

describe('log', () => {
  let logModule

  beforeEach(async () => logModule = require('../../lib/log'))
  afterEach(async () => jest.resetModules())

  it('should expose logging methods', () => {
    expect(lo.isFunction(logModule.log.debug)).toBe(true)
    expect(lo.isFunction(logModule.log.info)).toBe(true)
    expect(lo.isFunction(logModule.log.error)).toBe(true)
  })
})

describe('configureLog', () => {
  let logModule

  beforeEach(async () => {
    jest.mock('loglevel', () => ({
      setLevel: jest.fn(),
    }))
    logModule = require('../../lib/log')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  it('should set 0 verbose as ERROR', () => {
    logModule.configureLog(0)

    expect(logModule.log.setLevel).toHaveBeenCalledWith('ERROR')
  })

  it('should set 1 verbose as WARN', () => {
    logModule.configureLog(1)

    expect(logModule.log.setLevel).toHaveBeenCalledWith('WARN')
  })

  it('should set 2 verbose as INFO', () => {
    logModule.configureLog(2)

    expect(logModule.log.setLevel).toHaveBeenCalledWith('INFO')
  })

  it('should set 3 verbose as DEBUG', () => {
    logModule.configureLog(3)

    expect(logModule.log.setLevel).toHaveBeenCalledWith('DEBUG')
  })

  it('should set 4 verbose as TRACE', () => {
    logModule.configureLog(4)

    expect(logModule.log.setLevel).toHaveBeenCalledWith('TRACE')
  })

  it('should set 5 verbose as SILENT', () => {
    logModule.configureLog(5)

    expect(logModule.log.setLevel).toHaveBeenCalledWith('SILENT')
  })

  it('should set 6 verbose as SILENT', () => {
    logModule.configureLog(6)

    expect(logModule.log.setLevel).toHaveBeenCalledWith('SILENT')
  })
})

describe('getLogLevel', () => {
  let logModule

  beforeEach(async () => {
    jest.mock('loglevel', () => ({
      getLevel: jest.fn(),
      levels: {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5,
      }
    }))
    logModule = require('../../lib/log')
  })

  afterEach(async () => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  it('should identify level 0 as TRACE', () => {
    logModule.log.getLevel.mockImplementation(() => 0)
    expect(logModule.getLogLevel()).toEqual('TRACE')
  })

  it('should identify level 1 as DEBUG', () => {
    logModule.log.getLevel.mockImplementation(() => 1)
    expect(logModule.getLogLevel()).toEqual('DEBUG')
  })

  it('should identify level 2 as INFO', () => {
    logModule.log.getLevel.mockImplementation(() => 2)
    expect(logModule.getLogLevel()).toEqual('INFO')
  })

  it('should identify level 3 as WARN', () => {
    logModule.log.getLevel.mockImplementation(() => 3)
    expect(logModule.getLogLevel()).toEqual('WARN')
  })

  it('should identify level 4 as ERROR', () => {
    logModule.log.getLevel.mockImplementation(() => 4)
    expect(logModule.getLogLevel()).toEqual('ERROR')
  })

  it('should identify level 5 as SILENT', () => {
    logModule.log.getLevel.mockImplementation(() => 5)
    expect(logModule.getLogLevel()).toEqual('SILENT')
  })
})
