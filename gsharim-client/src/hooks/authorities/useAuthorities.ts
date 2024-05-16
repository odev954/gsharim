import { authorityImages } from "assets/authorities/index";
import { Authority } from "./types";
import * as strings from "./strings";

export default function useAuthorities(): Authority[] {
	const authorities: Authority[] = [
		{
			top: 16.5,
			right: 91.5,
			name: strings.authority1,
			logoSrc: authorityImages[0],
		},
		{
			top: 18,
			right: 83,
			name: strings.authority2,
			logoSrc: authorityImages[14],
		},
		{
			top: 21,
			right: 87,
			name: strings.authority3,
			logoSrc: authorityImages[24],
		},
		{
			top: 24.5,
			right: 92,
			name: strings.authority4,
			logoSrc: authorityImages[22],
		},
		{
			top: 25,
			right: 95,
			name: strings.authority5,
			logoSrc: authorityImages[4],
		},
		{
			top: 23,
			right: 89,
			name: strings.authority6,
			logoSrc: authorityImages[21],
		},
		{
			top: 25,
			right: 87,
			name: strings.authority7,
			logoSrc: authorityImages[11],
		},
		{
			top: 26,
			right: 91.5,
			name: strings.authority8,
			logoSrc: authorityImages[8],
		},
		{
			top: 26,
			right: 89,
			name: strings.authority9,
			logoSrc: authorityImages[23],
		},
		{
			top: 25,
			right: 80,
			name: strings.authority10,
			logoSrc: authorityImages[6],
		},
		{
			top: 30,
			right: 80,
			name: strings.authority11,
			logoSrc: authorityImages[10],
		},
		{
			top: 28,
			right: 78,
			name: strings.authority12,
			logoSrc: authorityImages[16],
		},
		{
			top: 28,
			right: 82,
			name: strings.authority13,
			logoSrc: authorityImages[3],
		},
		{
			top: 28,
			right: 96.5,
			name: strings.authority14,
			logoSrc: authorityImages[15],
		},
		{
			top: 30,
			right: 94,
			name: strings.authority15,
			logoSrc: authorityImages[5],
		},
		{
			top: 32,
			right: 92,
			name: strings.authority16,
			logoSrc: authorityImages[7],
		},
		{
			top: 35,
			right: 91.5,
			name: strings.authority17,
			logoSrc: authorityImages[13],
		},
		{
			top: 44.5,
			right: 58,
			name: strings.authority18,
			logoSrc: authorityImages[27],
		},
		{
			top: 51,
			right: 58,
			name: strings.authority19,
			logoSrc: authorityImages[2],
		},
		{
			top: 51,
			right: 62,
			name: strings.authority20,
			logoSrc: authorityImages[20],
		},
		{
			top: 55,
			right: 67,
			name: strings.authority21,
			logoSrc: authorityImages[30],
		},
		{
			top: 57,
			right: 64,
			name: strings.authority22,
			logoSrc: authorityImages[25],
		},
		{
			top: 59,
			right: 70,
			name: strings.authority23,
			logoSrc: authorityImages[32],
		},
		{
			top: 61.3,
			right: 66.5,
			name: strings.authority24,
			logoSrc: authorityImages[19],
		},
		{
			top: 60,
			right: 62,
			name: strings.authority25,
			logoSrc: authorityImages[17],
		},
		{
			top: 62.6,
			right: 65.5,
			name: strings.authority26,
			logoSrc: authorityImages[26],
		},
		{
			top: 64,
			right: 60,
			name: strings.authority27,
			logoSrc: authorityImages[18],
		},
		{
			top: 66.5,
			right: 64,
			name: strings.authority28,
			logoSrc: authorityImages[31],
		},
		{
			top: 55,
			right: 45,
			name: strings.authority29,
			logoSrc: authorityImages[28],
		},
		{
			top: 60,
			right: 42,
			name: strings.authority30,
			logoSrc: authorityImages[1],
		},
		{
			top: 64,
			right: 40,
			name: strings.authority31,
			logoSrc: authorityImages[29],
		},
		{
			top: 62,
			right: 48,
			name: strings.authority32,
			logoSrc: authorityImages[9],
		},
		{
			top: 86,
			right: 2.5,
			name: strings.authority33,
			logoSrc: authorityImages[12],
		},
	];

	return authorities;
}
