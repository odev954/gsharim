import { Mock } from "vitest";
import { useState } from "react";

export type UseStateMock = Mock<
	Parameters<typeof useState>,
	ReturnType<typeof useState>
>;
