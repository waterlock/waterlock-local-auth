REPORTER = spec
MOCHA = ./node_modules/.bin/mocha
SAILS = ./node_modules/.bin/sails
WATERLOCK = ./node_modules/.bin/waterlock
JSHINT = ./node_modules/.bin/jshint
ISTANBUL = ./node_modules/.bin/istanbul
TESTAPP = _testapp

ifeq (true,$(COVERAGE))
test: jshint coverage
else
test: jshint base
endif

base:
	@echo "running mocha tests..."
	@NODE_ENV=test $(MOCHA) \
	--colors \
    --reporter $(REPORTER) \
    --recursive \
	
coveralls:
	@echo "running mocha tests with coveralls..."
	@NODE_ENV=test $(ISTANBUL) \
	cover ./node_modules/mocha/bin/_mocha \
	--report lcovonly \
	-- -R $(REPORTER) \
	--recursive && \
	cat ./coverage/lcov.info |\
	 ./node_modules/coveralls/bin/coveralls.js && \
	 rm -rf ./coverage


jshint:
	@echo "running lint..."
	$(JSHINT) lib	

clean:
	@echo "clean..."
	rm -rf $(TESTAPP)

coverage: coveralls


.PHONY: test base coveralls coverage provision