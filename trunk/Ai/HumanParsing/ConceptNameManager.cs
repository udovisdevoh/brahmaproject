using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai
{
    /// <summary>
    /// To convert a concept into its various names or to get associated concept to name
    /// </summary>
    internal class ConceptNameManager : IEnumerable<Concept>
    {
        #region Fields and Parts
        /// <summary>
        /// Converts names to concepts
        /// </summary>
        private Dictionary<string, Concept> mapNameToConcept;

        /// <summary>
        /// Converts neuron to name lists
        /// </summary>
        private Dictionary<Concept, List<string>> mapConceptToName;
        #endregion

        #region Constructor
        /// <summary>
        /// Build a concept name mapper
        /// </summary>
        public ConceptNameManager()
        {
            mapNameToConcept = new Dictionary<string, Concept>();
            mapConceptToName = new Dictionary<Concept, List<string>>();
        }
        #endregion

        #region Properties
        /// <summary>
        /// Get concept from name
        /// </summary>
        /// <param name="name">name</param>
        /// <returns>concept</returns>
        public Concept this[string name]
        {
            get
            {
                name = name.ToLowerInvariant();
                Concept neuron;
                if (!mapNameToConcept.TryGetValue(name, out neuron))
                {
                    neuron = new Concept(name);
                    mapNameToConcept.Add(name, neuron);

                    List<string> nameList;
                    if (!mapConceptToName.TryGetValue(neuron, out nameList))
                    {
                        nameList = new List<string>();
                        mapConceptToName.Add(neuron, nameList);
                    }
                    nameList.Add(name);
                }
                return neuron;
            }
        }

        /// <summary>
        /// Get name list from concept
        /// </summary>
        /// <param name="concept">concept</param>
        /// <returns>name list for concepts</returns>
        public List<string> this[Concept concept]
        {
            get
            {
                List<string> nameList;
                if (!mapConceptToName.TryGetValue(concept, out nameList))
                {
                    nameList = new List<string>();
                    nameList.Add(concept.ToString());
                    mapConceptToName.Add(concept, nameList);
                    mapNameToConcept.Add(concept.ToString(), concept);
                }
                return nameList;
            }
        }
        #endregion

        #region IEnumerable<Concept> Members
        /// <summary>
        /// Get enumerator
        /// </summary>
        /// <returns>enumerator</returns>
        public IEnumerator<Concept> GetEnumerator()
        {
            return mapConceptToName.Keys.GetEnumerator();
        }

        /// <summary>
        /// Get enumerator
        /// </summary>
        /// <returns>enumerator</returns>
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return mapConceptToName.Keys.GetEnumerator();
        }
        #endregion
    }
}