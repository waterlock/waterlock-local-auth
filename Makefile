REPORTER = spec
TESTS = $(shell find ./tests/* -name "*.test.js")
MOCHA = ./node_modules/.bin/mocha
SAILS = ./node_modules/.bin/sails
JSHINT = ./node_modules/.bin/jshint

ifeq (true,$(COVERAGE))
test: jshint coverage
else
test: jshint base clean
endif

base:
	@echo "running mocha tests..."
	@NODE_ENV=test $(MOCHA) \
	--colors \
    --reporter $(REPORTER) \
    --recursive \
	$(TESTS) 
	
coveralls:
	@echo "running mocha tests with coveralls..."
	@NODE_ENV=test istanbul \
	cover ./node_modules/mocha/bin/_mocha \
	--report lcovonly \
	-- -R spec \
	--recursive \
	$(TESTS) && \
	cat ./coverage/lcov.info |\
	 ./node_modules/coveralls/bin/coveralls.js && \
	 rm -rf ./coverage

jshint:
	@echo "running lint..."
	$(JSHINT) lib	

clean:
	@echo "clean..."
	rm -rf _testapp

coverage: coveralls clean


.PHONY: test base coveralls coverage