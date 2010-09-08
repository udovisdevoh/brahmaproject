using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ArtificialArt.Ai.HumanParsing;

namespace Ack5.UnitTesting
{
    internal static class UnitTestingConceptNameManager
    {
        internal static void Test()
        {
            ConceptNameManager conceptNameManager = new ConceptNameManager();
            UnitTesting.AssertEquals(conceptNameManager["cat"] == conceptNameManager["cat"], true);
            UnitTesting.AssertEquals(conceptNameManager["cat"] == conceptNameManager["dog"], false);
            UnitTesting.AssertEquals(conceptNameManager["cat"] == conceptNameManager["CaT"], true);
        }
    }
}