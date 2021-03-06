import test from 'ava';

import { isSourceKeeper, SOURCEKEEPER_USERNAME } from './index';

declare const global: any;

// @todo stub creep with sinon
// @todo spy if .owner.username is actually accessed

class StubCreep {
	public owner: { username: string };
	constructor(username: string) {
		this.owner = {
			username,
		};
	}
}

test.beforeEach(() => {
	global.Creep = StubCreep;
});

test('SOURCEKEEPER_USERNAME should match string "Source Keeper"', t => {
	t.is(SOURCEKEEPER_USERNAME, 'Source Keeper');
});

test('When passing a string, it should only return true when matching SOURCEKEEPER_USERNAME', t => {
	t.true(isSourceKeeper(SOURCEKEEPER_USERNAME));
	t.false(isSourceKeeper('PostCrafter'));
	t.false(isSourceKeeper('Invader'));
	t.false(isSourceKeeper('Screeps'));
});

test('When passing a Creep should only return true when the owner is matching SOURCEKEEPER_USERNAME', t => {
	t.true(isSourceKeeper(stubCreep(SOURCEKEEPER_USERNAME)));
	t.false(isSourceKeeper(stubCreep('PostCrafter')));
	t.false(isSourceKeeper(stubCreep('Invader')));
	t.false(isSourceKeeper(stubCreep('Screeps')));
	t.false(isSourceKeeper(stubCreep('Rising')));
});

test.todo('Generative testing with testcheck-js for any other test cases');

function stubCreep(ownerUsername: string): Creep {
	return new StubCreep(ownerUsername) as Creep;
}
