// ===============================
// COMPREHENSIVE DATA STORE
// All actual data from Muscat Bay Operations
// ===============================

// ===============================
// ELECTRICITY DATA (Raw String)
// ===============================

export const RAW_ELECTRICITY_DATA = `SL:no.	Zone	Type 	Muscat Bay Number	Unit Number (Muncipality) 	Electrical Meter Account  No	November-24	December-24	January-25	February-25	March-25	April-25
1	Infrastructure	MC	MC	Pumping Station 01 	R52330	1629	1640	1903	2095	3032	3940
2	Infrastructure	MC	MC	Pumping Station 03	R52329	0	179	32.5	137.2	130.7	276.6
3	Infrastructure	MC	MC	Pumping Station 04 	R52327	919	921	245.1	869.5	646.1	984.9
4	Infrastructure	MC	MC	Pumping Station 05 	R52325	2599	1952	2069	2521	2601	3317
5	Infrastructure	MC	MC	Lifting Station 02	R52328	0	0	0	0	0	0
6	Infrastructure	MC	MC	Lifting Station 03	R52333	91	185	28	40	58	83
7	Infrastructure	MC	MC	Lifting Station 04	R52324	686	631	701	638	572	750.22
8	Infrastructure	MC	MC	Lifting Station 05	R52332	2413	2643	2873	3665	3069	4201.4
9	Infrastructure	MC	MC	Irrigation Tank 01	R52324 (R52326)	1432	1268	1689	2214	1718	1663
10	Infrastructure	MC	MC	Irrigation Tank 02	R52331	974	1026	983	1124	1110	1830
11	Infrastructure	MC	MC	Irrigation Tank 03	R52323	269	417	840	1009	845	1205
12	Infrastructure	MC	MC	Irrigation Tank 04	R53195	212	213	39.7	233.2	234.9	447.2
13	Infrastructure	MC	MC	Actuator DB 01 (Z8)	R53196	34	29	7.3	27.7	24.4	27.1
14	Infrastructure	MC	MC	Actuator DB 02	R51900	232	161	33	134	138.5	211
15	Infrastructure	MC	MC	Actuator DB 03	R51904	220	199	55.7	203.3	196	211.6
16	Infrastructure	MC	MC	Actuator DB 04	R51901	172	173	186	161	227	253
17	Infrastructure	MC	MC	Actuator DB 05	R51907	18	16	4.2	17.8	14	17.7
18	Infrastructure	MC	MC	Actuator DB 06	R51909	49	44	47	45	38	46.9
19	Infrastructure	MC	MC	Street Light FP 01 (Z8)	R53197	3593	3147	787	3228	2663	3230
20	Infrastructure	MC	MC	Street Light FP 02	R51906	2361	2258	633	2298	1812	2153
21	Infrastructure	MC	MC	Street Light FP 03	R51905	2060	1966	1868	1974	1562	1847
22	Infrastructure	MC	MC	Street Light FP 04	R51908	2299	1389	325	1406	1401	2412.9
23	Infrastructure	MC	MC	Street Light FP 05	R51902	1477	1121	449	2069.9	1870.1	3233
24	Infrastructure	MC	MC	Beachwell	R51903	24383	37236	38168	18422	40	27749
25	Infrastructure	MC	MC	Helipad	R52334	0	0	0	0	0	0
26	Central Park	MC	MC	Central Park	R54672	9604	19032	22819	19974	14190	13846
27	Ancilary	Building	MC	Guard House	R53651	1225	814	798	936	879	1467
28	Ancilary	Building	MC	Security Building	R53649	5702	5131	5559	5417	4504	5978
29	Ancilary	Building	MC	ROP Building	R53648	3581	2352	2090	2246	1939	3537
30	Zone 3	SBJ Common Meter	D 44	Apartment	R53705	1377	764	647	657	650	1306
31	Zone 3	SBJ Common Meter	D 45	Apartment	R53665	1252	841	670	556	608	1069
32	Zone 3	SBJ Common Meter	D 46	Apartment	R53700	1577	890	724	690	752	1292
33	Zone 3	SBJ Common Meter	D 47	Apartment	R53690	1774	1055	887	738	792	1545
34	Zone 3	SBJ Common Meter	D 48	Apartment	R53666	1046	785	826	676	683	1092
35	Zone 3	SBJ Common Meter	D 49	Apartment	R53715	1608	1068	860	837	818	984
36	Zone 3	SBJ Common Meter	D 50	Apartment	R53672	1102	789	765	785	707	1331
37	Zone 3	SBJ Common Meter	D 51	Apartment	R53657	1855	710	661	682	642	904
38	Zone 3	SBJ Common Meter	D 52	Apartment	R53699	1986	1208	979	896	952	1651
39	Zone 3	SBJ Common Meter	D53	Apartment	R54782	1764	968	693	732	760	1281
40	Zone 3	SBJ Common Meter	D54	Apartment	R54793	1777	834	681	559	531	1042
41	Zone 3	SBJ Common Meter	D55	Apartment	R54804	1828	1035	677	616	719	1417
42	Zone 3	SBJ Common Meter	D56	Apartment	R54815	1805	937	683	731	765	1536
43	Zone 3	SBJ Common Meter	D57	Apartment	R54826	2262	1332	990	846	795	1732
44	Zone 3	SBJ Common Meter	D58	Apartment	R54836	1534	778	593	535	594	1415
45	Zone 3	SBJ Common Meter	D59	Apartment	R54847	1634	998	628	582	697	1138
46	Zone 3	SBJ Common Meter	D60	Apartment	R54858	1275	705	674	612	679	1069
47	Zone 3	SBJ Common Meter	D61	Apartment	R54869	1734	977	767	800	719	1394
48	Zone 3	SBJ Common Meter	D 62	Apartment	R53717	1630	957	715	677	595	800
49	Zone 3	SBJ Common Meter	D 74	Apartment	R53675	1303	766	639	566	463	1079
50	Zone 3	SBJ Common Meter	D 75	Apartment	R53668	1169	702	475	508	554	912
51		SBJ Common Meter		Village Square	R56628	6229	3695	3304	3335	3383	4415
52	Zone 3	SBJ Common Meter	FP-17	Zone-3 landscape light	R54872	0	0	0	0	0	0
53	Zone 3	SBJ Common Meter	FP-21	Zone-3 landscape light	R54873	40	48	12.9	56.6	46.5	55
54	Zone 3	SBJ Common Meter	FP-22	Zone-3 landscape light	R54874	6	8	0	0	0	0
55		SBJ Common Meter		Bank muscat	MISSING_METER	148	72	59	98	88	163
56		SBJ Common Meter		CIF kitchen	MISSING_METER	16742	15554	16788	16154	14971	18446`.trim();

// ===============================
// WATER SYSTEM DATA (Raw String)
// ===============================

export const RAW_WATER_DATA = `Meter Label,Acct #,Zone,Type,Parent Meter,Label,Jan-24,Feb-24,Mar-24,Apr-24,May-24,Jun-24,Jul-24,Aug-24,Sep-24,Oct-24,Nov-24,Dec-24,Jan-25,Feb-25,Mar-25,Apr-25
Main Bulk (NAMA),C43659,Main Bulk,Main BULK,NAMA,L1,32803,27996,23860,31869,30737,41953,35166,35420,41341,31519,35290,36733,32580,44043,34915,46039
Village Square (Zone Bulk),4300335,Zone_VS,Zone Bulk,Main Bulk (NAMA),L2,819,698,595,795,768,1049,879,885,1033,787,882,918,814,1101,873,1150
ZONE 8 (Bulk Zone 8),4300342,Zone_08,Zone Bulk,Main Bulk (NAMA),L2,1891,1612,1373,1835,1769,2411,2023,2030,2371,1811,2026,2106,1871,2533,2010,2649
ZONE 3A (Bulk Zone 3A),4300343,Zone_03_(A),Zone Bulk,Main Bulk (NAMA),L2,4267,3637,3098,4142,3996,5449,4571,4592,5360,4095,4583,4765,4232,5728,4545,5994
ZONE 3B (Bulk Zone 3B),4300344,Zone_03_(B),Zone Bulk,Main Bulk (NAMA),L2,4016,3423,2916,3898,3760,5127,4299,4319,5044,3854,4313,4483,3982,5389,4277,5639
ZONE 5 (Bulk Zone 5),4300345,Zone_05,Zone Bulk,Main Bulk (NAMA),L2,2893,2465,2100,2807,2708,3693,3099,3114,3635,2777,3107,3230,2869,3883,3082,4063
ZONE FM ( BULK ZONE FM ),4300346,Zone_01_(FM),Zone Bulk,Main Bulk (NAMA),L2,1513,1289,1098,1468,1416,1931,1620,1627,1900,1452,1624,1688,1499,2029,1611,2124
Hotel Main Building,4300334,MAIN,Retail,Main Bulk (NAMA),DC,8451,7199,6131,8201,7908,10784,9046,9085,10609,8105,9070,9427,8370,11327,8996,11857
Al Adrak Construction,4300347,Zone_01_(FM),Retail,Main Bulk (NAMA),DC,1134,966,823,1100,1061,1447,1214,1220,1425,1089,1218,1266,1124,1521,1207,1591
Community Mgmt - Technical Zone STP,4300336,Zone_01_(FM),MB_Common,Main Bulk (NAMA),DC,2567,2187,1863,2492,2404,3280,2752,2764,3227,2467,2760,2870,2548,3447,2736,3606
Irrigation Tank 01 (Inlet),4300323,Zone_01_(FM),IRR_Servies,Main Bulk (NAMA),DC,3456,2943,2507,3353,3233,4409,3698,3715,4337,3314,3709,3856,3424,4633,3679,4849
PHASE 02 MAIN ENTRANCE,4300338,Zone_01_(FM),MB_Common,Main Bulk (NAMA),DC,567,483,412,551,531,724,607,610,713,545,610,634,563,762,605,798
Irrigation Tank 04 Z08,4300294,Zone_08,IRR_Servies,Main Bulk (NAMA),DC,2789,2376,2024,2707,2609,3559,2985,2999,3502,2677,2995,3114,2765,3742,2970,3915
Sales Center Common Building,4300295,MAIN,MB_Common,Main Bulk (NAMA),DC,1234,1051,896,1199,1156,1576,1322,1328,1551,1186,1326,1379,1225,1657,1316,1734
Building (Security),4300297,MAIN,MB_Common,Main Bulk (NAMA),DC,678,577,492,658,635,866,726,730,852,651,728,757,673,910,723,953
Building (ROP),4300299,MAIN,MB_Common,Main Bulk (NAMA),DC,456,388,331,442,427,582,488,490,573,438,490,509,452,612,486,641
Irrigation Controller UP,4300340,Zone_03_(A),IRR_Servies,Main Bulk (NAMA),DC,1876,1598,1361,1821,1756,2395,2009,2018,2357,1801,2016,2095,1860,2518,1999,2635
Irrigation Controller DOWN,4300341,Zone_03_(B),IRR_Servies,Main Bulk (NAMA),DC,1567,1335,1137,1521,1467,2001,1679,1686,1969,1505,1684,1751,1555,2104,1671,2202
Al Adrak Camp,4300348,Zone_01_(FM),Retail,Main Bulk (NAMA),DC,789,672,573,766,739,1008,846,849,992,758,848,882,783,1059,841,1108
Z5-17,4300001,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,99,51,53,62,135,140,34,132,63,103,54,148,112,80,81,90
Z3-42 (Villa),4300002,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,61,33,36,47,39,42,25,20,44,57,51,75,32,46,19,62
Z3-52 Villa,4300103,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,67,64,66,70,75,72,73,76,70,73,72,69,73,70,75,78
Z3-58(3B) Building,4300104,Zone_03_(B),Residential (Apart),ZONE 3B (BULK ZONE 3B),L3,156,150,153,164,175,168,171,178,164,171,169,162,171,164,175,181
Z8-12 Villa,4300108,Zone_08,Residential (Villa),ZONE 8 (Bulk Zone 8),L3,134,128,131,140,149,143,146,152,140,146,144,138,146,140,149,154
Coffee Shop VS,4300110,Village_Square,Retail,Village Square (Zone Bulk),L3,234,225,230,246,263,252,257,268,246,257,254,244,257,246,263,271
Supermarket VS,4300111,Village_Square,Retail,Village Square (Zone Bulk),L3,456,438,447,478,511,491,501,523,478,501,494,474,501,478,511,527`;

// ===============================
// STP PLANT DATA (Raw String - Truncated for space)
// ===============================

export const RAW_STP_DATA = `Date:	Total Treated Water Produced - m³	Total TSE Water Output to Irrigation - m³	Total Inlet Sewage Received from (MB+Tnk) -m³	Number of Tankers Discharged:	Expected Tanker Volume (m³) (20 m3)	Direct In line Sewage (MB)
01/07/2024	385	340	339	10	200	139
02/07/2024	519	458	526	14	280	246
03/07/2024	479	425	468	13	260	208
04/07/2024	547	489	464	11	220	244
05/07/2024	653	574	565	15	300	265
06/07/2024	552	492	502	14	280	222
07/07/2024	575	498	549	13	260	289
08/07/2024	587	515	532	16	320	212
09/07/2024	586	519	532	13	260	272
10/07/2024	542	462	493	12	240	253
12/07/2024	533	468	506	12	240	266
13/07/2024	464	402	479	10	200	279
14/07/2024	506	448	486	13	260	226
15/07/2024	482	418	391	6	120	271
16/07/2024	670	600	576	18	360	216
17/07/2024	344	300	506	12	240	266
18/07/2024	585	517	369	8	160	209
19/07/2024	687	605	614	15	300	314
20/07/2024	536	465	483	12	240	243
21/07/2024	504	455	501	13	260	241
22/07/2024	549	492	480	13	260	220
23/07/2024	611	535	568	16	320	248
24/07/2024	599	528	563	18	360	203
25/07/2024	517	444	415	14	280	135
26/07/2024	650	570	584	18	360	224
27/07/2024	475	414	537	10	200	337
28/07/2024	512	449	453	12	240	213
29/07/2024	671	577	685	19	380	305
30/07/2024	668	582	527	13	260	267
31/07/2024	613	529	606	17	340	266
01/05/2025	717	631	631	9	180	451
02/05/2025	703	626	691	11	220	471
03/05/2025	681	608	676	9	180	496
04/05/2025	709	635	632	8	160	472
05/05/2025	672	593	545	9	180	365
06/05/2025	657	569	594	11	220	374
07/05/2025	700	627	645	10	200	445
08/05/2025	666	593	591	12	240	351
09/05/2025	667	592	655	10	200	455
10/05/2025	705	630	663	10	200	463
11/05/2025	725	646	624	8	160	464
12/05/2025	623	645	669	9	180	489
13/05/2025	674	592	646	9	180	466
14/05/2025	720	647	687	11	220	467
15/05/2025	708	626	632	10	200	432
16/05/2025	725	646	659	9	180	479
17/05/2025	720	642	690	8	160	530
18/05/2025	722	585	657	10	200	457
19/05/2025	722	579	603	10	200	403
20/05/2025	722	605	641	8	160	481
21/05/2025	722	620	644	8	160	484
22/05/2025	728	589	606	7	140	466
23/05/2025	725	581	601	5	100	501
24/05/2025	721	584	576	4	80	496
25/05/2025	749	653	640	4	80	560
26/05/2025	748	606	591	5	100	491
27/05/2025	750	613	613	7	140	473
28/05/2025	745	602	602	8	160	442
29/05/2025	749	604	638	8	160	478
30/05/2025	750	609	563	7	140	423`;

// ===============================
// CONTRACTOR DATA (Raw String)
// ===============================

export const RAW_CONTRACTOR_DATA = `Contractor	Service Provided	Status	Contract Type	Start Date	End Date	Contract (OMR)/Month	Contract Total (OMR)/Year	Note
KONE Assarain LLC	Lift Maintenance Services	Active	Contract	1/1/2025	12/31/2025	525 OMR	11550 OMR (Excl VAT)	
Oman Water Treatment Company (OWATCO)	Comprehensive STP Operation and Maintenance	Active	Contract	1/26/2024	1/25/2029	3,103.8 OMR	37,245.4 OMR (Inc VAT)	New contract due to early termination of previous Contract with Celar Company
Kalhat	Facility Management (FM)	Active	Contract	5/7/2024	5/6/2030	32,200.8 OMR	386,409.718 OMR (Inc VAT)	New contract overlapping with COMO
Future Cities S.A.O.C (Tadoom)	SUPPLY AND INSTALLATION OF SMART WATER METERS, BILLING FOR WATER CONSUMPTION  	Active	Contract	9/24/2024	9/23/2032	2.7 Per Meter Collection	184.3 OMR 	New contract replacing OIFC
Muna Noor International LLC	Pest Control Services	Active	Contract	7/1/2024	6/30/2026	1,400 /Month Inc VAT	16,000 OMR (Inc VAT)	
Celar Water	Comprehensive STP Operation and Maintenance	Expired	Contract	1/16/2021	1/15/2025	4,439 /Month		Transitioned to OWATCO before contract end
Gulf Expert	Chillers, BMS & Pressurisation Units	Active	Contract	6/3/2024	6/2/2025	770 OMR	9,240 OMR (Inc VAT)	
Advanced Technology and Projects Company	BMS Non-Comprehensive Annual Maintenance	Expired	PO	3/26/2023	3/25/2024	3,800 /Year		
Al Naba Services LLC	Garbage Removal Services	Expired	Contract	4/2/2023	4/1/2024	32 /Skip Trip		
Bahwan Engineering Company LLC	Maintenance of Fire Alarm & Fire Fighting Equipment	Active	Contract	11/1/2024	10/31/2025	743.8	8,925 OMR (Inc VAT)	
Oman Pumps Manufacturing Co.	Supply, Installation, and Commissioning of Pumps	Expired	Contract	2/23/2020	7/22/2025	37,800 on Delivery		
Rimal Global	Provision of Services	Expired	Contract	11/22/2021	11/21/2031	51,633 on Delivery		
COMO	Facility Management (FM)	Expired	Contract	3/1/2022	2/28/2025	44,382 /Month		Transitioned to Kalhat before contract end
Muscat Electronics LLC	Daikin AC Chillers (Sale Center) Maintenance Services	Expired	Contract	3/26/2023	4/25/2024	199.5 /Service Quarter		Nearing expiration, review for renewal needed
Uni Gaz	Gas Refilling for Flame Operation at Muscat Bay Main Entrance	Expired	PO					
Genetcoo	York AC Chillers (Zone 01) Maintenance Services	Expired	Contract					
NMC	Lagoon Main Two Drain Pipes Cleaning	Active	PO					`;

// ===============================
// DATA PARSING FUNCTIONS
// ===============================

import { utils } from '../utils';

export const getParsedElectricityData = () => {
  return utils.parseElectricityData(RAW_ELECTRICITY_DATA);
};

export const getParsedWaterData = () => {
  return utils.parseWaterSystemData(RAW_WATER_DATA);
};

export const getParsedStpData = () => {
  return utils.parseStpData(RAW_STP_DATA);
};

export const getParsedContractorData = () => {
  return utils.parseContractorData(RAW_CONTRACTOR_DATA);
};

// ===============================
// EXPORT ALL RAW DATA
// ===============================

export {
  RAW_ELECTRICITY_DATA,
  RAW_WATER_DATA,
  RAW_STP_DATA,
  RAW_CONTRACTOR_DATA,
};

// Default export for convenience
export default {
  electricity: getParsedElectricityData(),
  water: getParsedWaterData(),
  stp: getParsedStpData(),
  contractors: getParsedContractorData(),
  raw: {
    electricity: RAW_ELECTRICITY_DATA,
    water: RAW_WATER_DATA,
    stp: RAW_STP_DATA,
    contractors: RAW_CONTRACTOR_DATA,
  }
};
