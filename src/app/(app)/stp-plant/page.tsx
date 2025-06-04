
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Label as RechartsLabel, Area, AreaChart, ComposedChart } from 'recharts';
import { Search, Bell, ChevronDown, SlidersHorizontal, Share2, LayoutDashboard, BarChart2, List, Zap, TrendingUp, Users2, Power, DollarSign, Filter, Activity, Droplets, Combine, UserCheck, Columns, Sparkles, X, CalendarDays, Building, Menu, Moon, Sun, Download, Settings, AlertCircle, CheckCircle, Wifi, WifiOff, Database, Recycle, Gauge, FlaskConical, Waves, Target, Clock, TrendingDown } from 'lucide-react';

// ===============================
// DESIGN SYSTEM & CONSTANTS
// ===============================

// Primary Color Scheme - Muscat Bay Brand Colors
const COLORS = {
  primary: '#4E4456',        // Main brand color - Deep purple-gray
  primaryLight: '#5f5168',   // Muted deep purple/gray from logo
  primaryDark: '#3B3241',    // Darker variant for active states
  accent: '#A8D5E3',         // Soft teal for highlights
  success: '#10B981',        // Green for positive metrics
  warning: '#BFA181',        // Muted gold for warnings
  info: '#0A1828',          // Deep classic blue for information
  error: '#EF4444',         // Red for errors
  
  // Chart colors palette - Muscat Bay themed
  chart: ['#4E4456', '#A8D5E3', '#BFA181', '#0A1828', '#5f5168', '#C3FBF4', '#F2F0EA', '#10B981', '#EF4444', '#6A5ACD']
};

// ===============================
// STP DATA PARSING & UTILITIES
// ===============================

const rawStpDataString = `Date:	Total Treated Water Produced - m³	Total TSE Water Output to Irrigation - m³	Total Inlet Sewage Received from (MB+Tnk) -m³	Number of Tankers Discharged:	Expected Tanker Volume (m³) (20 m3)	Direct In line Sewage (MB)
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
01/08/2024	601	528	542	15	300	242
02/08/2024	676	590	660	15	300	360
03/08/2024	544	474	493	13	260	233
04/08/2024	571	497	510	13	260	250
05/08/2024	574	500	515	13	260	255
06/08/2024	643	554	604	16	320	284
07/08/2024	608	516	490	19	380	110
08/08/2024	610	524	642	17	340	302
09/08/2024	630	550	531	12	240	291
10/08/2024	583	499	525	13	260	265
11/08/2024	554	483	559	11	220	339
12/08/2024	606	531	469	12	240	229
13/08/2024	569	499	459	12	240	219
14/08/2024	525	492	509	11	220	289
15/08/2024	579	502	541	13	260	281
16/08/2024	591	516	548	11	220	328
17/08/2024	466	414	512	14	280	232
18/08/2024	591	516	478	13	260	218
19/08/2024	529	470	430	11	220	210
20/08/2024	579	495	521	13	260	261
21/08/2024	586	500	478	12	240	238
22/08/2024	486	437	552	13	260	292
23/08/2024	564	478	449	12	240	209
24/08/2024	581	505	461	9	180	281
25/08/2024	488	420	369	8	160	209
26/08/2024	371	291	409	8	160	249
27/08/2024	453	417	391	8	160	231
28/08/2024	642	557	535	9	180	355
29/08/2024	413	360	368	9	180	188
30/08/2024	624	551	626	14	280	346
31/08/2024	535	473	465	9	180	285
01/09/2024	504	441	477	11	220	257
02/09/2024	355	317	370	5	100	270
03/09/2024	540	481	441	9	180	261
04/09/2024	358	300	332	4	80	252
05/09/2024	547	483	450	6	120	330
06/09/2024	518	474	489	14	280	209
07/09/2024	568	504	559	12	240	319
08/09/2024	478	422	479	9	180	299
09/09/2024	515	459	463	9	180	283
10/09/2024	453	396	422	7	140	282
11/09/2024	566	495	519	12	240	279
12/09/2024	489	437	457	10	200	257
13/09/2024	671	611	564	14	280	284
14/09/2024	357	311	343	5	100	243
15/09/2024	354	307	348	7	140	208
16/09/2024	412	366	443	8	160	283
17/09/2024	352	314	303	8	160	143
18/09/2024	424	371	380	8	160	220
19/09/2024	441	401	378	9	180	198
20/09/2024	581	519	511	14	280	231
21/09/2024	452	391	434	9	180	254
22/09/2024	355	317	370	9	180	190
23/09/2024	292	262	291	5	100	191
24/09/2024	555	498	462	8	160	302
25/09/2024	364	319	390	10	200	190
26/09/2024	386	342	352	7	140	212
27/09/2024	519	467	489	11	220	269
28/09/2024	539	469	483	8	160	323
29/09/2024	557	503	448	9	180	268
30/09/2024	388	350	424	6	120	304
01/10/2024	482	417	405	5	100	305
02/10/2024	419	361	433	8	160	273
03/10/2024	575	520	475	9	180	295
04/10/2024	602	506	547	15	300	247
05/10/2024	555	515	522	8	160	362
06/10/2024	425	365	457	8	160	297
07/10/2024	592	533	544	11	220	324
08/10/2024	524	462	489	11	220	269
09/10/2024	637	568	532	11	220	312
10/10/2024	559	491	494	11	220	274
11/10/2024	541	438	549	12	240	309
12/10/2024	526	512	511	8	160	351
13/10/2024	405	345	332	6	120	212
14/10/2024	601	548	509	7	140	369
15/10/2024	569	489	581	10	200	381
16/10/2024	607	538	548	8	160	388
17/10/2024	659	575	636	11	220	416
18/10/2024	677	597	565	10	200	365
19/10/2024	583	509	589	8	160	429
20/10/2024	614	542	537	10	200	337
21/10/2024	585	513	539	12	240	299
22/10/2024	606	528	525	9	180	345
23/10/2024	614	532	592	11	220	372
24/10/2024	522	442	546	11	220	326
25/10/2024	601	524	603	9	180	423
26/10/2024	636	557	588	12	240	348
27/10/2024	594	487	523	6	120	403
28/10/2024	586	535	595	9	180	415
29/10/2024	613	535	511	7	140	371
30/10/2024	583	506	543	9	180	363
31/10/2024	577	500	577	7	140	437
01/11/2024	553	476	476	5	100	376
02/11/2024	609	513	553	8	160	393
03/11/2024	494	419	498	8	160	338
04/11/2024	542	480	430	6	120	310
05/11/2024	570	489	481	9	180	301
06/11/2024	423	351	371	7	140	231
07/11/2024	516	449	609	12	240	369
08/11/2024	621	538	516	11	220	296
09/11/2024	581	500	517	13	260	257
10/11/2024	573	495	464	6	120	344
11/11/2024	588	505	449	11	220	229
12/11/2024	567	494	466	8	160	306
13/11/2024	578	495	546	8	160	386
14/11/2024	567	484	504	9	180	324
15/11/2024	572	488	489	6	120	369
16/11/2024	559	474	520	9	180	340
17/11/2024	448	363	461	5	100	361
18/11/2024	534	466	475	10	200	275
19/11/2024	567	484	479	8	160	319
20/11/2024	579	494	465	6	120	345
21/11/2024	551	461	478	6	120	358
22/11/2024	574	488	494	7	140	354
23/11/2024	518	427	417	7	140	277
24/11/2024	507	434	387	4	80	307
25/11/2024	569	474	560	8	160	400
26/11/2024	561	471	501	10	200	301
27/11/2024	539	447	524	9	180	344
28/11/2024	548	456	487	7	140	347
29/11/2024	560	464	403	6	120	283
30/11/2024	520	427	520	6	120	400
01/12/2024	542	447	481	5	100	381
02/12/2024	526	442	496	6	120	376
03/12/2024	539	442	462	5	100	362
04/12/2024	537	449	357	5	100	257
05/12/2024	551	455	595	9	180	415
06/12/2024	484	403	437	4	80	357
07/12/2024	550	462	456	4	80	376
08/12/2024	570	474	462	5	100	362
09/12/2024	531	450	429	6	120	309
10/12/2024	493	412	453	8	160	293
11/12/2024	586	501	496	5	100	396
12/12/2024	554	461	441	5	100	341
13/12/2024	507	439	441	8	160	281
14/12/2024	585	515	506	8	160	346
15/12/2024	493	414	501	7	140	361
16/12/2024	541	468	438	6	120	318
17/12/2024	580	476	553	9	180	373
18/12/2024	581	498	496	7	140	356
19/12/2024	560	471	542	8	160	382
20/12/2024	585	488	440	8	160	280
21/12/2024	575	475	502	6	120	382
22/12/2024	606	513	536	7	140	396
23/12/2024	587	497	448	7	140	308
24/12/2024	542	449	526	4	80	446
25/12/2024	614	513	517	6	120	397
26/12/2024	590	495	531	8	160	371
27/12/2024	621	517	542	5	100	442
28/12/2024	611	524	541	7	140	401
29/12/2024	605	511	528	7	140	388
30/12/2024	598	509	525	7	140	385
31/12/2024	600	506	535	4	80	455
01/01/2025	601	504	493	3	60	433
02/01/2025	600	491	528	3	60	468
03/01/2025	577	494	450	4	80	370
04/01/2025	587	486	507	4	80	427
05/01/2025	532	445	473	4	80	393
06/01/2025	572	472	445	4	80	365
07/01/2025	610	506	549	7	140	409
08/01/2025	526	454	511	5	100	411
09/01/2025	589	494	514	6	120	394
10/01/2025	637	528	535	8	160	375
11/01/2025	552	459	436	3	60	376
12/01/2025	508	419	473	6	120	353
13/01/2025	581	489	456	6	120	336
14/01/2025	594	502	513	8	160	353
15/01/2025	593	504	494	8	160	334
16/01/2025	521	438	509	10	200	309
17/01/2025	595	518	502	7	140	362
18/01/2025	608	526	537	8	160	377
19/01/2025	605	523	560	8	160	400
20/01/2025	595	503	517	8	160	357
21/01/2025	602	517	552	8	160	392
22/01/2025	576	498	482	6	120	362
23/01/2025	599	526	477	6	120	357
24/01/2025	606	499	504	7	140	364
25/01/2025	601	523	543	8	160	383
26/01/2025	605	516	509	8	160	349
27/01/2025	601	515	519	8	160	359
28/01/2025	607	519	582	11	220	362
29/01/2025	615	529	521	9	180	341
30/01/2025	598	510	519	9	180	339
31/01/2025	619	526	513	7	140	373
01/02/2025	527	456	511	8	160	351
02/02/2025	505	423	511	9	180	331
03/02/2025	584	489	496	8	160	336
04/02/2025	578	484	545	9	180	365
05/02/2025	582	482	527	6	120	407
06/02/2025	588	493	482	8	160	322
07/02/2025	576	482	485	6	120	365
08/02/2025	582	478	531	4	80	451
09/02/2025	586	489	521	9	180	341
10/02/2025	594	495	514	6	120	394
11/02/2025	589	501	546	7	140	406
12/02/2025	614	527	528	5	100	428
13/02/2025	620	525	503	4	80	423
14/02/2025	614	527	554	4	80	474
15/02/2025	627	533	538	4	80	458
16/02/2025	630	539	561	5	100	461
17/02/2025	628	539	544	5	100	444
18/02/2025	609	520	517	5	100	417
19/02/2025	582	489	539	4	80	459
20/02/2025	553	459	482	2	40	442
21/02/2025	518	419	478	1	20	458
24/02/2025	437	361	491	0	0	491
25/02/2025	247	159	334	0	0	334
26/02/2025	272	226	342	0	0	342
27/02/2025	595	512	502	0	0	502
28/02/2025	571	468	498	2	40	458
01/03/2025	583	476	487	0	0	487
02/03/2025	592	514	493	1	20	473
03/03/2025	598	517	497	1	20	477
04/03/2025	600	516	561	5	100	461
05/03/2025	608	521	503	3	60	443
06/03/2025	607	530	544	6	120	424
07/03/2025	621	532	552	5	100	452
08/03/2025	617	531	570	6	120	450
09/03/2025	607	521	468	4	80	388
10/03/2025	610	524	600	6	120	480
11/03/2025	607	511	536	3	60	476
12/03/2025	601	509	511	6	120	391
13/03/2025	606	508	532	3	60	472
14/03/2025	609	507	519	6	120	399
15/03/2025	602	504	534	2	40	494
16/03/2025	591	494	514	4	80	434
17/03/2025	591	500	522	4	80	442
18/03/2025	578	480	469	5	100	369
19/03/2025	565	467	526	3	60	466
20/03/2025	610	511	504	4	80	424
21/03/2025	619	519	505	4	80	425
22/03/2025	616	523	535	5	100	435
23/03/2025	627	541	586	6	120	466
24/03/2025	630	540	542	6	120	422
25/03/2025	613	522	588	5	100	488
26/03/2025	631	541	513	8	160	353
27/03/2025	627	538	653	7	140	513
28/03/2025	631	546	538	3	60	478
29/03/2025	623	534	639	4	80	559
30/03/2025	640	558	531	3	60	471
31/03/2025	640	558	531	3	60	471
01/04/2025	639	551	585	5	100	485
02/04/2025	650	560	595	6	120	475
03/04/2025	634	556	573	5	100	473
04/04/2025	656	573	609	4	80	529
05/04/2025	648	569	595	5	100	495
06/04/2025	658	579	559	6	120	439
07/04/2025	653	574	550	7	140	410
08/04/2025	648	562	641	8	160	481
09/04/2025	656	568	578	5	100	478
10/04/2025	654	558	617	6	120	497
11/04/2025	671	582	576	6	120	456
12/04/2025	660	576	620	8	160	460
13/04/2025	676	595	617	5	100	517
14/04/2025	673	592	601	8	160	441
15/04/2025	641	557	561	7	140	421
16/04/2025	674	590	643	8	160	483
17/04/2025	665	581	564	6	120	444
18/04/2025	660	577	589	7	140	449
19/04/2025	647	563	606	8	160	446
20/04/2025	647	553	654	7	140	514
21/04/2025	635	524	524	6	120	404
22/04/2025	647	565	585	3	60	525
23/04/2025	688	578	589	5	100	489
24/04/2025	695	594	606	6	120	486
25/04/2025	712	609	598	6	120	478
26/04/2025	706	584	638	6	120	518
27/04/2025	714	603	580	5	100	480
28/04/2025	716	607	573	5	100	473
29/04/2025	710	602	624	9	180	444
30/04/2025	710	646	642	9	180	462
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
30/05/2025	750	609	563	7	140	423`.trim();

const parseStpData = (rawData) => {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const dateStr = values[0]?.trim();
    
    // Parse date
    let parsedDate = null;
    if (dateStr) {
      const [day, month, year] = dateStr.split('/');
      if (day && month && year) {
        parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
    }

    return {
      id: index + 1,
      date: dateStr,
      parsedDate: parsedDate,
      month: parsedDate ? parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A',
      treatedWater: parseFloat(values[1]) || 0,
      tseOutput: parseFloat(values[2]) || 0,
      totalInlet: parseFloat(values[3]) || 0,
      tankersDischarge: parseInt(values[4]) || 0,
      expectedTankerVolume: parseFloat(values[5]) || 0,
      directSewage: parseFloat(values[6]) || 0,
      // Calculated fields
      treatmentEfficiency: values[1] && values[3] && parseFloat(values[3]) > 0 ? ((parseFloat(values[1]) / parseFloat(values[3])) * 100) : 0,
      irrigationEfficiency: values[2] && values[1] && parseFloat(values[1]) > 0 ? ((parseFloat(values[2]) / parseFloat(values[1])) * 100) : 0,
      tankerPercentage: values[5] && values[3] && parseFloat(values[3]) > 0 ? ((parseFloat(values[5]) / parseFloat(values[3])) * 100) : 0,
    };
  }).filter(item => item.date && item.date !== 'N/A');
};

const initialStpData = parseStpData(rawStpDataString);

// Plant design specifications
const PLANT_DESIGN_CAPACITY = 750; // m³/day

// ===============================
// SHARED COMPONENTS (already defined in electricity, but scoped here for clarity)
// ===============================

const SummaryCard = ({ title, value, icon, unit, trend, trendColor, iconBgColor, isLoading }) => {
  const IconComponent = icon;
  return (
    <div className="bg-background p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-border dark:bg-slate-800 dark:border-slate-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-muted-foreground font-semibold text-md">{title}</h3>
        <div className={`p-3 rounded-full text-primary-foreground shadow-md`} style={{backgroundColor: iconBgColor || COLORS.primary }}>
          <IconComponent size={22} />
        </div>
      </div>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-24 mb-2 dark:bg-slate-700"></div>
          <div className="h-4 bg-muted rounded w-16 dark:bg-slate-700"></div>
        </div>
      ) : (
        <>
          <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5">
            {value} <span className="text-base font-medium text-muted-foreground">{unit}</span>
          </p>
          {trend && <p className={`text-xs sm:text-sm font-medium ${trendColor || 'text-muted-foreground'}`}>{trend}</p>}
        </>
      )}
    </div>
  );
};

const ChartWrapper = ({ title, children, subtitle, actions }) => (
  <div className="bg-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-border dark:bg-slate-800 dark:border-slate-700">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex space-x-2">{actions}</div>}
    </div>
    <div className="mt-4" style={{ height: '350px' }}>
      {children}
    </div>
  </div>
);

const StyledSelect = ({ label, value, onChange, options, id, icon: Icon, disabled }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">{label}</label>
            <div className="relative">
                <select 
                  id={id} 
                  value={value} 
                  onChange={onChange} 
                  disabled={disabled}
                  className="appearance-none w-full p-2.5 pr-10 border border-input rounded-lg text-sm focus:ring-2 focus:ring-ring focus:outline-none bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {options.map(option => ( <option key={option.value} value={option.value}>{option.label}</option> ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                    {Icon ? <Icon size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>
        </div>
    );
};


// ===============================
// STP PLANT MODULE
// ===============================

const STPPlantModule = () => {
  const [activeSubSection, setActiveSubSection] = useState('Dashboard');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedMetric, setSelectedMetric] = useState('All Metrics');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClientDarkMode, setIsClientDarkMode] = useState(false);

  useEffect(() => {
    setIsClientDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Extract available months from the data
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    initialStpData.forEach(item => {
      if (item.parsedDate) {
        const monthYear = item.parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthsSet.add(monthYear);
      }
    });
    return Array.from(monthsSet).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  }, []);

  // Data processing for selected month
  const filteredStpData = useMemo(() => {
    if (selectedMonth === 'All Months') {
      return initialStpData;
    }
    
    return initialStpData.filter(item => {
      if (!item.parsedDate) return false;
      const itemMonth = item.parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return itemMonth === selectedMonth;
    });
  }, [selectedMonth]);

  // Monthly summary data for all months
  const monthlyData = useMemo(() => {
    const monthlyMap = {};
    
    initialStpData.forEach(item => {
      if (!item.parsedDate) return;
      const monthKey = item.parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = {
          month: monthKey,
          treatedWater: 0,
          tseOutput: 0,
          totalInlet: 0,
          tankersDischarge: 0,
          directSewage: 0,
          days: 0
        };
      }
      
      monthlyMap[monthKey].treatedWater += item.treatedWater;
      monthlyMap[monthKey].tseOutput += item.tseOutput;
      monthlyMap[monthKey].totalInlet += item.totalInlet;
      monthlyMap[monthKey].tankersDischarge += item.tankersDischarge;
      monthlyMap[monthKey].directSewage += item.directSewage;
      monthlyMap[monthKey].days++;
    });
    
    return Object.values(monthlyMap).map((month: any) => ({
      ...month,
      avgDaily: Math.round(month.treatedWater / month.days),
      efficiency: month.totalInlet > 0 ? Math.round((month.treatedWater / month.totalInlet) * 1000) / 10 : 0,
      irrigationEff: month.treatedWater > 0 ? Math.round((month.tseOutput / month.treatedWater) * 1000) / 10 : 0,
      capacityUtilization: month.days > 0 ? Math.round((month.treatedWater / month.days / PLANT_DESIGN_CAPACITY) * 1000) / 10 : 0
    })).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });
  }, []);

  // KPI Calculations
  const kpiData = useMemo(() => {
    const data = filteredStpData;
    const totalDays = data.length;
    
    if (totalDays === 0) {
      return {
        avgTreatedWater: 0, avgTseOutput: 0, avgEfficiency: 0, totalTankersDischarge: 0,
        avgTankerPercentage: 0, capacityUtilization: 0, totalDays: 0,
        totalTreatedWater: 0, totalTseOutput: 0, totalInputProcess: 0, avgTotalInput: 0
      };
    }

    const totalTreatedWater = data.reduce((acc, curr) => acc + curr.treatedWater, 0);
    const totalTseOutput = data.reduce((acc, curr) => acc + curr.tseOutput, 0);
    const totalInputProcess = data.reduce((acc, curr) => acc + curr.totalInlet, 0);
    const avgTreatedWater = totalTreatedWater / totalDays;
    const avgTseOutput = totalTseOutput / totalDays;
    const avgTotalInput = totalInputProcess / totalDays;
    const avgEfficiency = data.reduce((acc, curr) => acc + curr.treatmentEfficiency, 0) / totalDays;
    const totalTankersDischarge = data.reduce((acc, curr) => acc + curr.tankersDischarge, 0);
    const avgTankerPercentage = data.reduce((acc, curr) => acc + curr.tankerPercentage, 0) / totalDays;
    const capacityUtilization = (avgTreatedWater / PLANT_DESIGN_CAPACITY) * 100;

    return {
      avgTreatedWater: Math.round(avgTreatedWater),
      avgTseOutput: Math.round(avgTseOutput),
      avgEfficiency: Math.round(avgEfficiency * 10) / 10,
      totalTankersDischarge,
      avgTankerPercentage: Math.round(avgTankerPercentage * 10) / 10,
      capacityUtilization: Math.round(capacityUtilization * 10) / 10,
      totalDays,
      totalTreatedWater: Math.round(totalTreatedWater),
      totalTseOutput: Math.round(totalTseOutput),
      totalInputProcess: Math.round(totalInputProcess),
      avgTotalInput: Math.round(avgTotalInput)
    };
  }, [filteredStpData]);

  // Recent 15 days trend data
  const trendData = useMemo(() => {
    const dataSet = selectedMonth === 'All Months' ? initialStpData : filteredStpData;
    return dataSet.slice(-15).map(item => ({
      date: item.date ? item.date.substring(0, 5) : 'N/A', 
      treated: item.treatedWater || 0,
      tse: item.tseOutput || 0,
      inlet: item.totalInlet || 0,
      efficiency: Math.round((item.treatmentEfficiency || 0) * 10) / 10,
      tankers: item.tankersDischarge || 0
    }));
  }, [selectedMonth, filteredStpData]);

  // Process efficiency breakdown
  const processEfficiencyData = useMemo(() => {
    const data = filteredStpData;
    if (data.length === 0) {
      return [
        { name: 'Treatment Efficiency', value: 0, color: COLORS.success },
        { name: 'Irrigation Efficiency', value: 0, color: COLORS.info },
        { name: 'Tanker Input Ratio', value: 0, color: COLORS.warning },
        { name: 'Direct Sewage Ratio', value: 0, color: COLORS.accent }
      ];
    }
    
    const avgTreatmentEff = data.reduce((acc, curr) => acc + (curr.treatmentEfficiency || 0), 0) / data.length;
    const avgIrrigationEff = data.reduce((acc, curr) => acc + (curr.irrigationEfficiency || 0), 0) / data.length;
    const avgTankerRatio = data.reduce((acc, curr) => acc + (curr.tankerPercentage || 0), 0) / data.length;
    
    return [
      { name: 'Treatment Efficiency', value: Math.round(avgTreatmentEff * 10) / 10, color: COLORS.success },
      { name: 'Irrigation Efficiency', value: Math.round(avgIrrigationEff * 10) / 10, color: COLORS.info },
      { name: 'Tanker Input Ratio', value: Math.round(avgTankerRatio * 10) / 10, color: COLORS.warning },
      { name: 'Direct Sewage Ratio', value: Math.round((100 - avgTankerRatio) * 10) / 10, color: COLORS.accent }
    ];
  }, [filteredStpData]);

  const handleAiAnalysis = async () => {
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiAnalysisResult("");
    
    setTimeout(() => {
      const monthText = selectedMonth === 'All Months' ? 'All Available Data' : selectedMonth;
      const remainingCapacity = Math.max(0, PLANT_DESIGN_CAPACITY - kpiData.avgTreatedWater);
      const performanceStatus = kpiData.capacityUtilization > 85 ? 'NEAR CAPACITY' : 
                               kpiData.capacityUtilization > 70 ? 'HIGH UTILIZATION' : 
                               kpiData.capacityUtilization > 50 ? 'MODERATE UTILIZATION' : 'LOW UTILIZATION';
      
      setAiAnalysisResult(`🔬 AI Analysis Results for STP Plant (${monthText}):

📊 PERFORMANCE SUMMARY:
• Plant Design Capacity: ${PLANT_DESIGN_CAPACITY} m³/day
• Period: ${selectedMonth === 'All Months' ? `${kpiData.totalDays} days total` : `${selectedMonth} (${kpiData.totalDays} days)`}
• Total Water Treated: ${kpiData.totalTreatedWater.toLocaleString()} m³
• Total Input Processed: ${kpiData.totalInputProcess.toLocaleString()} m³
• Total TSE Production: ${kpiData.totalTseOutput.toLocaleString()} m³
• Current Avg Production: ${kpiData.avgTreatedWater} m³/day
• Capacity Utilization: ${kpiData.capacityUtilization}% (${performanceStatus})

🎯 CAPACITY ANALYSIS:
• ${kpiData.capacityUtilization > 80 ? 'HIGH DEMAND: Operating near design limits' : kpiData.capacityUtilization > 60 ? 'MODERATE DEMAND: Good operational range' : 'LOW DEMAND: Significant spare capacity available'}
• Remaining Daily Capacity: ${remainingCapacity} m³/day
• Treatment Efficiency: ${kpiData.avgEfficiency}% (Target: >90%)
• TSE Recovery Rate: ${kpiData.avgTreatedWater > 0 ? Math.round((kpiData.avgTseOutput / kpiData.avgTreatedWater) * 100) : 0}%
• Tanker Operations: ${kpiData.totalTankersDischarge} units (${kpiData.avgTankerPercentage.toFixed(1)}% of input)

⚡ OPERATIONAL INSIGHTS:
• Treatment efficiency is ${kpiData.avgEfficiency > 90 ? 'EXCELLENT' : kpiData.avgEfficiency > 80 ? 'GOOD' : 'NEEDS IMPROVEMENT'} - ${kpiData.avgEfficiency > 90 ? 'exceeding target standards' : 'below optimal performance'}
• ${selectedMonth === 'All Months' ? `Overall production averaging ${kpiData.avgTreatedWater} m³/day` : `${selectedMonth} production: ${kpiData.totalTreatedWater.toLocaleString()} m³ total`}
• Input vs Output Ratio: ${kpiData.totalInputProcess > 0 ? Math.round((kpiData.totalTreatedWater / kpiData.totalInputProcess) * 100) : 0}% processing efficiency
• TSE Production represents ${kpiData.totalTreatedWater > 0 ? Math.round((kpiData.totalTseOutput / kpiData.totalTreatedWater) * 100) : 0}% of treated water

💡 STRATEGIC RECOMMENDATIONS:
• CAPACITY: ${kpiData.capacityUtilization > 85 ? 'URGENT - Consider expansion planning, operating near design limits' : kpiData.capacityUtilization < 50 ? 'OPPORTUNITY - Significant spare capacity for growth' : 'OPTIMAL - Good utilization range for efficient operations'}
• EFFICIENCY: ${kpiData.avgEfficiency < 85 ? 'CRITICAL - Investigate treatment process efficiency, equipment maintenance required' : 'MAINTAIN - Current operational standards meeting targets'}
• INPUT SOURCE: ${kpiData.avgTankerPercentage > 60 ? 'HIGH TANKER DEPENDENCY - Evaluate direct sewage line capacity expansion' : 'BALANCED - Good distribution between tanker and direct inputs'}
• TSE UTILIZATION: ${kpiData.totalTseOutput > 0 ? `${kpiData.totalTseOutput.toLocaleString()} m³ TSE available for irrigation - optimize reuse programs` : 'Monitor TSE production for irrigation opportunities'}
• FUTURE PLANNING: ${remainingCapacity > 100 ? `${remainingCapacity} m³/day spare capacity supports development growth` : 'Consider operational optimization strategies'}`);
      setIsAiLoading(false);
    }, 2500);
  };

  // Sub-navigation for STP module
  const StpSubNav = () => {
    const subSections = [
        { name: 'Dashboard', id: 'Dashboard', icon: LayoutDashboard },
        { name: 'Performance', id: 'Performance', icon: TrendingUp },
        { name: 'Process Flow', id: 'ProcessFlow', icon: Combine },
        { name: 'Analytics', id: 'Analytics', icon: BarChart2 },
    ];
    
    return (
        <div className="mb-6 print:hidden flex justify-center">
            <div className="bg-background shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-border dark:bg-slate-800 dark:border-slate-700">
                {subSections.map((tab) => {
                    const isActive = activeSubSection === tab.id;
                    return ( 
                      <button 
                        key={tab.id} 
                        onClick={() => setActiveSubSection(tab.id)} 
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105`} 
                        style={{ 
                            backgroundColor: isActive ? COLORS.primary : 'transparent', 
                            color: isActive ? 'white' : (isClientDarkMode ? COLORS.primaryLight : COLORS.primaryDark), 
                        }} 
                        onMouseOver={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = COLORS.primaryLight; e.currentTarget.style.color = 'white';} }} 
                        onMouseOut={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = (isClientDarkMode ? COLORS.primaryLight : COLORS.primaryDark);}}}
                      > 
                        <tab.icon size={18} style={{ color: isActive ? 'white' : COLORS.primary }}/> 
                        <span>{tab.name}</span> 
                      </button> 
                    );
                })}
            </div>
        </div>
    );
  };

  // Filter Bar
  const FilterBar = () => {
    const monthOptions = [
      { value: 'All Months', label: 'All Months' },
      ...availableMonths.map(m => ({ value: m, label: m }))
    ];
    
    const metricOptions = [
      { value: 'All Metrics', label: 'All Metrics' },
      { value: 'Treatment Efficiency', label: 'Treatment Efficiency' },
      { value: 'Water Production', label: 'Water Production' },
      { value: 'Capacity Utilization', label: 'Capacity Utilization' },
      { value: 'Tanker Operations', label: 'Tanker Operations' }
    ];
    
    return (
        <div className="bg-background shadow p-4 rounded-lg mb-6 print:hidden sticky top-[70px] md:top-[68px] z-10 border border-border dark:bg-slate-800 dark:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                <StyledSelect 
                  id="monthFilter" 
                  label="Select Month" 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)} 
                  options={monthOptions} 
                  icon={CalendarDays}
                />
                <StyledSelect 
                  id="metricFilter" 
                  label="Focus Metrics" 
                  value={selectedMetric} 
                  onChange={(e) => setSelectedMetric(e.target.value)} 
                  options={metricOptions} 
                  icon={Target}
                />
                <button 
                  onClick={handleAiAnalysis}
                  className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full lg:w-auto hover:shadow-lg" 
                  style={{ backgroundColor: COLORS.accent }} 
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primary} 
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.accent}
                  disabled={isAiLoading}
                > 
                  <Sparkles size={16}/> 
                  <span>{isAiLoading ? 'Analyzing...' : '🧠 AI Analysis'}</span> 
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-6">
      <StpSubNav />
      
      {activeSubSection === 'Dashboard' && <FilterBar />}
      
      {activeSubSection === 'Dashboard' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <SummaryCard 
              title={selectedMonth === 'All Months' ? "Total Treated Water" : `${selectedMonth} Total`} 
              value={kpiData.totalTreatedWater.toLocaleString()} 
              unit="m³" 
              icon={Droplets} 
              trend={selectedMonth === 'All Months' ? `${kpiData.avgTreatedWater} m³/day avg` : `${kpiData.avgTreatedWater} m³/day avg`} 
              trendColor="text-slate-500 dark:text-slate-400" 
              iconBgColor={COLORS.info}
              isLoading={isLoading}
            />
            <SummaryCard 
              title={selectedMonth === 'All Months' ? "Total Input Process" : `${selectedMonth} Input`} 
              value={kpiData.totalInputProcess.toLocaleString()} 
              unit="m³" 
              icon={Activity} 
              trend={selectedMonth === 'All Months' ? `${kpiData.avgTotalInput} m³/day avg` : `${kpiData.avgTotalInput} m³/day avg`} 
              trendColor="text-slate-600 dark:text-slate-300" 
              iconBgColor={COLORS.accent}
              isLoading={isLoading}
            />
            <SummaryCard 
              title={selectedMonth === 'All Months' ? "Total TSE Production" : `${selectedMonth} TSE`} 
              value={kpiData.totalTseOutput.toLocaleString()} 
              unit="m³" 
              icon={Recycle} 
              trend={selectedMonth === 'All Months' ? `${kpiData.avgTseOutput} m³/day avg` : `${kpiData.avgTseOutput} m³/day avg`} 
              trendColor="text-green-600 dark:text-green-400" 
              iconBgColor={COLORS.warning}
              isLoading={isLoading}
            />
            <SummaryCard 
              title="Capacity Utilization" 
              value={kpiData.capacityUtilization.toFixed(1)} 
              unit="%" 
              icon={Gauge} 
              trend={`${Math.max(0, PLANT_DESIGN_CAPACITY - kpiData.avgTreatedWater)} m³/day spare`} 
              trendColor="text-slate-600 dark:text-slate-300" 
              iconBgColor={COLORS.primary}
              isLoading={isLoading}
            />
            <SummaryCard 
              title={selectedMonth === 'All Months' ? "Total Tankers" : `${selectedMonth} Tankers`} 
              value={kpiData.totalTankersDischarge.toString()} 
              unit="units" 
              icon={Database} 
              trend={`${kpiData.avgTankerPercentage.toFixed(1)}% of input`} 
              trendColor="text-slate-600 dark:text-slate-300" 
              iconBgColor={COLORS.success}
              isLoading={isLoading}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartWrapper title="Daily Treatment Performance" subtitle={`Recent 15 days - ${selectedMonth === 'All Months' ? 'Latest Data' : selectedMonth}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                    <Tooltip 
                      contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} 
                      itemStyle={{color: 'var(--foreground)'}} 
                      labelStyle={{color: 'var(--foreground)', fontWeight: 'bold'}}
                    />
                    <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/>
                    <Bar yAxisId="left" dataKey="treated" fill={COLORS.chart[0]} name="Treated Water (m³)" />
                    <Bar yAxisId="left" dataKey="tse" fill={COLORS.chart[1]} name="TSE Output (m³)" />
                    <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke={COLORS.success} strokeWidth={3} name="Efficiency %" />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey={() => PLANT_DESIGN_CAPACITY} 
                      stroke={COLORS.error} 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                      name={`Design Capacity (${PLANT_DESIGN_CAPACITY} m³)`}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            <ChartWrapper title="Performance Metrics" subtitle={`${selectedMonth} efficiency breakdown`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processEfficiencyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    cornerRadius={3}
                  >
                    {processEfficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <RechartsLabel 
                      value={`${Math.round(processEfficiencyData[0]?.value || 0)}%`} 
                      position="centerBottom" 
                      dy={-5} 
                      className="text-xl font-bold fill-foreground"
                    />
                    <RechartsLabel 
                      value="Avg Efficiency" 
                      position="centerTop" 
                      dy={10} 
                      className="text-xs fill-muted-foreground"
                    />
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} />
                  <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: '15px', fontSize: '11px'}}/>
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>

          {/* Monthly Summary */}
          <ChartWrapper title="Monthly Performance Overview" subtitle="Production volumes, efficiency and capacity utilization">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} 
                  itemStyle={{color: 'var(--foreground)'}} 
                  labelStyle={{color: 'var(--foreground)', fontWeight: 'bold'}}
                  formatter={(value, name) => {
                    if (name === 'Avg Daily (m³)') return [`${value} m³/day`, name];
                    if (name === 'Capacity %') return [`${value}%`, name];
                    if (name === 'Efficiency %') return [`${value}%`, name];
                    return [value, name];
                  }}
                />
                <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/>
                <Bar yAxisId="left" dataKey="avgDaily" fill={COLORS.chart[0]} name="Avg Daily (m³)" />
                <Line yAxisId="right" type="monotone" dataKey="capacityUtilization" stroke={COLORS.warning} strokeWidth={3} name="Capacity %" />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke={COLORS.success} strokeWidth={3} name="Efficiency %" />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey={() => PLANT_DESIGN_CAPACITY} 
                  stroke={COLORS.error} 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  name="Design Capacity" 
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </>
      )}

      {activeSubSection === 'Performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWrapper title="Treatment Efficiency Trend" subtitle="Daily efficiency over time">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <YAxis domain={[75, 105]} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke={COLORS.success} 
                    strokeWidth={3}
                    dot={{r:4, fill: COLORS.success}}
                    activeDot={{ r: 7, strokeWidth: 2, fill: COLORS.success }}
                    name="Treatment Efficiency %" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <ChartWrapper title="Input vs Output Analysis" subtitle="Water flow comparison">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="inlet" 
                    stackId="1" 
                    stroke={COLORS.chart[2]} 
                    fill={COLORS.chart[2]} 
                    fillOpacity={0.6}
                    name="Total Inlet (m³)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="treated" 
                    stackId="2" 
                    stroke={COLORS.chart[0]} 
                    fill={COLORS.chart[0]} 
                    fillOpacity={0.8}
                    name="Treated Water (m³)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartWrapper title="Tanker Discharge Frequency" subtitle="Daily tanker operations">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} />
                  <Bar dataKey="tankers" fill={COLORS.warning} name="Tankers Discharged" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <div className="lg:col-span-2">
              <div className="bg-background p-6 rounded-xl shadow-lg border border-border dark:bg-slate-800 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-foreground mb-4">Performance Indicators</h3>
                <div className="space-y-4">
                  {[
                    { 
                      name: 'Treatment Efficiency', 
                      value: kpiData.avgEfficiency, 
                      target: 90, 
                      unit: '%',
                      status: kpiData.avgEfficiency >= 90 ? 'excellent' : kpiData.avgEfficiency >= 80 ? 'good' : 'needs-improvement'
                    },
                    { 
                      name: 'Daily Water Production', 
                      value: kpiData.avgTreatedWater, 
                      target: PLANT_DESIGN_CAPACITY, 
                      unit: 'm³',
                      status: kpiData.avgTreatedWater >= (PLANT_DESIGN_CAPACITY * 0.9) ? 'excellent' : kpiData.avgTreatedWater >= (PLANT_DESIGN_CAPACITY * 0.7) ? 'good' : 'needs-improvement'
                    },
                    { 
                      name: 'Capacity Utilization', 
                      value: kpiData.capacityUtilization, 
                      target: 80, 
                      unit: '%',
                      status: kpiData.capacityUtilization >= 75 && kpiData.capacityUtilization <= 90 ? 'excellent' : kpiData.capacityUtilization >= 60 ? 'good' : 'needs-improvement'
                    },
                    { 
                      name: 'TSE Recovery Rate', 
                      value: kpiData.avgTreatedWater > 0 ? Math.round((kpiData.avgTseOutput / kpiData.avgTreatedWater) * 100) : 0, 
                      target: 85, 
                      unit: '%',
                      status: kpiData.avgTreatedWater > 0 && ((kpiData.avgTseOutput / kpiData.avgTreatedWater) * 100) >= 85 ? 'excellent' : kpiData.avgTreatedWater > 0 && ((kpiData.avgTseOutput / kpiData.avgTreatedWater) * 100) >= 75 ? 'good' : 'needs-improvement'
                    },
                    { 
                      name: 'Tanker Dependency', 
                      value: kpiData.avgTankerPercentage, 
                      target: 40, 
                      unit: '%',
                      status: kpiData.avgTankerPercentage <= 40 ? 'excellent' : kpiData.avgTankerPercentage <= 60 ? 'good' : 'needs-improvement'
                    }
                  ].map((indicator, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{indicator.name}</h4>
                        <p className="text-sm text-muted-foreground">Target: {indicator.target}{indicator.unit}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-lg font-bold text-foreground">
                          {typeof indicator.value === 'number' && !isNaN(indicator.value) ? indicator.value.toFixed(1) : '0'}{indicator.unit}
                        </p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-muted rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              indicator.status === 'excellent' ? 'bg-green-500' :
                              indicator.status === 'good' ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ 
                              width: `${Math.min(100, Math.max(0, (typeof indicator.value === 'number' && !isNaN(indicator.value) && indicator.target > 0 ? (indicator.value / (indicator.target * 1.2)) * 100 : 0)))}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        indicator.status === 'excellent' ? 'bg-success/20 text-success-foreground' : // These may need adjustment based on globals.css
                        indicator.status === 'good' ? 'bg-info/20 text-info-foreground' :
                        'bg-warning/20 text-warning-foreground'
                      }`}>
                        {indicator.status === 'excellent' ? 'EXCELLENT' :
                         indicator.status === 'good' ? 'GOOD' : 'REVIEW NEEDED'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubSection === 'ProcessFlow' && (
        <div className="space-y-6">
          <div className="bg-background p-8 rounded-xl shadow-lg border border-border dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">STP Process Flow Diagram</h3>
            
            <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
              {/* Input Stage */}
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-blue-300 dark:border-blue-700">
                  <Droplets size={32} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Raw Sewage Input</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Tankers: {kpiData.avgTankerPercentage.toFixed(1)}%</p>
                  <p>Direct Line: {(100 - kpiData.avgTankerPercentage).toFixed(1)}%</p>
                  <p className="font-medium text-foreground">
                    {selectedMonth === 'All Months' ? `${kpiData.totalInputProcess.toLocaleString()} m³ total` : `${kpiData.totalInputProcess.toLocaleString()} m³`}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Avg: {kpiData.avgTotalInput} m³/day</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center text-slate-400 dark:text-slate-500 text-3xl font-extralight lg:rotate-0 rotate-90">
                →
              </div>

              {/* Treatment Stage */}
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-green-300 dark:border-green-700">
                  <Combine size={32} className="text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Treatment Process</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Efficiency: {kpiData.avgEfficiency.toFixed(1)}%</p>
                  <p>Capacity: {kpiData.capacityUtilization.toFixed(1)}%</p>
                  <p className="font-medium text-foreground">{kpiData.avgTreatedWater} m³/day</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Remaining: {Math.max(0, PLANT_DESIGN_CAPACITY - kpiData.avgTreatedWater)} m³/day</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center text-slate-400 dark:text-slate-500 text-3xl font-extralight lg:rotate-0 rotate-90">
                →
              </div>

              {/* Output Stage */}
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-purple-300 dark:border-purple-700">
                  <Recycle size={32} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">TSE for Irrigation</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Recovery: {kpiData.avgTreatedWater > 0 ? Math.round((kpiData.avgTseOutput / kpiData.avgTreatedWater) * 100) : 0}%</p>
                  <p>Quality: Excellent</p>
                  <p className="font-medium text-foreground">
                    {selectedMonth === 'All Months' ? `${kpiData.totalTseOutput.toLocaleString()} m³ total` : `${kpiData.totalTseOutput.toLocaleString()} m³`}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">Avg: {kpiData.avgTseOutput} m³/day</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center border border-blue-200 dark:border-blue-800">
                <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Primary Treatment</h5>
                <p className="text-sm text-blue-600 dark:text-blue-400">Physical separation of solids and liquids through screening and settling</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center border border-green-200 dark:border-green-800">
                <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">Secondary Treatment</h5>
                <p className="text-sm text-green-600 dark:text-green-400">Biological treatment using activated sludge process for organic matter removal</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center border border-purple-200 dark:border-purple-800">
                <h5 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Tertiary Treatment</h5>
                <p className="text-sm text-purple-600 dark:text-purple-400">Advanced filtration and disinfection producing high-quality TSE water</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubSection === 'Analytics' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWrapper title="Input Source Analysis" subtitle={`${selectedMonth} - Tanker vs Direct Sewage`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { 
                        name: 'Tanker Input', 
                        value: Math.round(kpiData.avgTankerPercentage * 10) / 10, 
                        color: COLORS.warning 
                      },
                      { 
                        name: 'Direct Sewage', 
                        value: Math.round((100 - kpiData.avgTankerPercentage) * 10) / 10, 
                        color: COLORS.info 
                      }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                  >
                    {[
                      { name: 'Tanker Input', value: kpiData.avgTankerPercentage, color: COLORS.warning },
                      { name: 'Direct Sewage', value: 100 - kpiData.avgTankerPercentage, color: COLORS.info }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <ChartWrapper title="Capacity vs Performance" subtitle={`${selectedMonth} operational metrics`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { 
                    metric: 'Design Capacity', 
                    value: PLANT_DESIGN_CAPACITY, 
                    current: kpiData.avgTreatedWater,
                    percentage: 100 
                  },
                  { 
                    metric: 'Current Production', 
                    value: kpiData.avgTreatedWater, 
                    current: kpiData.avgTreatedWater,
                    percentage: kpiData.capacityUtilization 
                  },
                  { 
                    metric: 'TSE Output', 
                    value: kpiData.avgTseOutput, 
                    current: kpiData.avgTseOutput,
                    percentage: (kpiData.avgTseOutput / PLANT_DESIGN_CAPACITY) * 100 
                  }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} m³/day`]} contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} />
                  <Legend />
                  <Bar dataKey="value" fill={COLORS.chart[0]} name="Volume (m³/day)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>

          {/* Monthly Performance Table */}
          <div className="bg-background p-6 rounded-xl shadow-lg border border-border dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-foreground mb-4">Monthly Performance Summary</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    {['Month', 'Total Treated (m³)', 'Avg Daily (m³)', 'Capacity %', 'Efficiency %', 'TSE Output (m³)', 'Days'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {monthlyData.slice(-12).map((row, index) => (
                    <tr key={index} className={`hover:bg-muted/50 ${row.month === selectedMonth ? 'bg-accent/20' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{row.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{row.treatedWater.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{row.avgDaily}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          row.capacityUtilization > 85 ? 'bg-error/20 text-error-foreground' : // Example: Use semantic colors
                          row.capacityUtilization > 70 ? 'bg-warning/20 text-warning-foreground' :
                          row.capacityUtilization > 50 ? 'bg-success/20 text-success-foreground' :
                          'bg-info/20 text-info-foreground'
                        }`}>
                          {row.capacityUtilization.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          row.efficiency > 90 ? 'bg-success/20 text-success-foreground' :
                          row.efficiency > 80 ? 'bg-info/20 text-info-foreground' :
                          'bg-warning/20 text-warning-foreground'
                        }`}>
                          {row.efficiency.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{row.tseOutput.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"> 
          <div className="bg-background p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-border dark:bg-slate-800 dark:border-slate-700"> 
            <div className="flex justify-between items-center mb-4"> 
              <h3 className="text-xl font-semibold text-primary">🧠 AI STP Plant Analysis</h3> 
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-full hover:bg-muted"> 
                <X size={20} className="text-muted-foreground"/> 
              </button> 
            </div> 
            {isAiLoading ? ( 
              <div className="text-center py-8"> 
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <Combine size={48} className="animate-pulse text-primaryLight" /> 
                  <FlaskConical size={48} className="animate-bounce text-accent" />
                </div>
                <p className="mt-2 text-foreground">AI is analyzing STP performance data...</p> 
                <p className="text-sm text-muted-foreground mt-1">Evaluating treatment efficiency, flow patterns, and operational metrics</p>
              </div> 
            ) : ( 
              <div className="text-sm text-foreground space-y-3 whitespace-pre-wrap font-mono"> 
                {aiAnalysisResult ? ( 
                  aiAnalysisResult.split('\n').map((line, index) => {
                    if (line.startsWith('📊') || line.startsWith('🎯') || line.startsWith('⚡') || line.startsWith('💡')) {
                      return <h4 key={index} className="font-bold text-lg mt-4 mb-2 text-primary">{line}</h4>;
                    }
                    if (line.startsWith('•')) {
                      return <p key={index} className="ml-4 text-foreground">{line}</p>;
                    }
                    return <p key={index} className="text-foreground">{line}</p>;
                  })
                ) : ( 
                  <p>No analysis available or an error occurred.</p> 
                )} 
              </div> 
            )} 
            <div className="mt-6 text-right"> 
              <button 
                onClick={() => setIsAiModalOpen(false)} 
                className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              > 
                Close Analysis
              </button> 
            </div> 
          </div> 
        </div>
      )}
    </div>
  );
};


export default function STPPlantPage() {
  return <STPPlantModule />;
}

    